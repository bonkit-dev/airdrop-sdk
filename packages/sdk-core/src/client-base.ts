import { Program } from '@coral-xyz/anchor'
import type { Idl } from '@coral-xyz/anchor'
import type { Commitment, Connection, Signer, TransactionInstruction } from '@solana/web3.js'
import {
  AddressLookupTableAccount,
  PublicKey,
  TransactionMessage,
  VersionedTransaction,
} from '@solana/web3.js'

import type { AirdropStudioContract } from '../idl/airdrop-studio-contract'
import { createPdas, type AirdropStudioPdas } from './accounts'
import type { AirdropStudioAccounts } from './types'
import type { AirdropStudioNetwork } from './constants'
import type { AirdropStudioDeploymentConfig } from './deployment-config'
import { parseListChunk, type OnchainRecipient } from './onchain-list'
import {
  appendOnchainRecipientsInstruction,
  cancelMerkleAirdropInstruction,
  cancelOnchainAirdropInstruction,
  claimMerkleTokensInstruction,
  claimOnchainTokensInstruction,
  createMerkleAirdropInstruction,
  createOnchainAirdropInstruction,
  depositMerkleAirdropInstruction,
  depositOnchainAirdropInstruction,
  registerMerkleRootInstruction,
  startMerkleAirdropInstruction,
  startOnchainAirdropInstruction,
  withdrawMerkleAirdropInstruction,
  withdrawOnchainAirdropInstruction,
  type AppendOnchainRecipientsArgs,
  type CancelMerkleAirdropArgs,
  type CancelOnchainAirdropArgs,
  type ClaimMerkleTokensArgs,
  type ClaimOnchainTokensArgs,
  type CreateMerkleAirdropArgs,
  type CreateOnchainAirdropArgs,
  type DepositMerkleAirdropArgs,
  type DepositOnchainAirdropArgs,
  type RegisterMerkleRootArgs,
  type StartMerkleAirdropArgs,
  type StartOnchainAirdropArgs,
  type WithdrawMerkleAirdropArgs,
  type WithdrawOnchainAirdropArgs,
  type AutoInstructionContext,
} from './instructions'

export type AirdropStudioProgram = Program<AirdropStudioContract>

export type AirdropStudioClientConfig<TDeployment extends string> = {
  connection: Connection
  network: AirdropStudioNetwork
  deployment?: TDeployment
  defaultCommitment?: Commitment
  lookupTableAddress?: PublicKey
}

export type LookupTableUsage = 'use' | 'none'

export type TransactionBuildOptions = {
  payer: PublicKey
  commitment?: Commitment
  signers?: Signer[]
  useLookupTable?: LookupTableUsage
}

export type ListOnchainRecipientsArgs = {
  airdrop: PublicKey
  offset?: number
  limit?: number
  commitment?: Commitment
}

export type FetchClaimStatusFromLeafArgs = {
  airdrop: PublicKey
  leaf: Uint8Array
  commitment?: Commitment
}

export type FetchClaimStatusFromIndexArgs = {
  airdrop: PublicKey
  entryIndex: number
  commitment?: Commitment
}

type BuildTransactionParams = {
  payer: PublicKey
  instructions: TransactionInstruction[]
  commitment?: Commitment
  signers?: Signer[]
  useLookupTable?: LookupTableUsage
}

export class AirdropStudioClientBase<TDeployment extends string> {
  readonly program: AirdropStudioProgram
  readonly pdas: AirdropStudioPdas
  readonly connection: Connection
  readonly deployment: TDeployment
  readonly network: Exclude<AirdropStudioNetwork, 'mainnet'>
  lookupTableAddress: PublicKey | null
  readonly defaultCommitment: Commitment
  private lookupTableAccount: AddressLookupTableAccount | null = null

  protected constructor(
    config: AirdropStudioClientConfig<TDeployment>,
    program: AirdropStudioProgram,
    deploymentConfig: AirdropStudioDeploymentConfig<TDeployment>,
  ) {
    this.connection = config.connection
    this.deployment = deploymentConfig.deployment
    this.network = AirdropStudioClientBase.normalizeNetwork(config.network)
    const isLocalnet = AirdropStudioClientBase.isLocalRpcEndpoint(config.connection.rpcEndpoint)
    this.lookupTableAddress = isLocalnet
      ? (config.lookupTableAddress ?? null)
      : (config.lookupTableAddress ?? deploymentConfig.networkAltAddresses[this.network] ?? null)
    this.defaultCommitment = config.defaultCommitment ?? 'confirmed'
    this.program = program
    this.pdas = createPdas(program.programId)
  }

  static createProgram(
    connection: Connection,
    deploymentConfig: AirdropStudioDeploymentConfig<string>,
  ) {
    return new Program<AirdropStudioContract>(deploymentConfig.idl as Idl, {
      connection,
    })
  }

  static assertProgramIdMatchesDeployment(
    program: AirdropStudioProgram,
    deploymentConfig: AirdropStudioDeploymentConfig<string>,
  ) {
    if (!program.programId.equals(deploymentConfig.programId)) {
      throw new Error(
        `Deployment ${deploymentConfig.deployment} program id mismatch between IDL and constants.`,
      )
    }
  }

  async fetchStudioConfig(
    commitment?: Commitment,
  ): Promise<AirdropStudioAccounts['airdropStudioConfig']> {
    try {
      return await this.program.account.airdropStudioConfig.fetch(
        this.pdas.studioConfig(),
        commitment,
      )
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      throw new Error(`Unable to fetch AirdropStudioConfig: ${message}`)
    }
  }

  async fetchProtocolVault(commitment?: Commitment) {
    const config = await this.fetchStudioConfig(commitment)
    return config.protocolVault
  }

  async appendOnchainRecipients(args: AppendOnchainRecipientsArgs & TransactionBuildOptions) {
    const { payer, commitment, signers, useLookupTable, ...instructionArgs } = args
    const resolvedCommitment = this.resolveCommitment(commitment)
    const instructions = await appendOnchainRecipientsInstruction(
      instructionArgs,
      this.autoInstructionContext(resolvedCommitment),
    )
    return this.buildVersionedTransaction({
      payer,
      instructions,
      commitment: resolvedCommitment,
      signers,
      useLookupTable: useLookupTable ?? 'none',
    })
  }

  async listOnchainRecipients({
    airdrop,
    offset = 0,
    limit,
    commitment,
  }: ListOnchainRecipientsArgs): Promise<OnchainRecipient[]> {
    if (offset < 0) {
      throw new Error('Offset must be non-negative.')
    }
    if (typeof limit === 'number' && limit < 0) {
      throw new Error('Limit must be non-negative.')
    }

    const resolvedCommitment = this.resolveCommitment(commitment)
    const listRoot = this.pdas.listRoot(airdrop)
    const listChunk = this.pdas.listChunk(airdrop)
    const [listRootInfo, listChunkInfo] = await Promise.all([
      this.connection.getAccountInfo(listRoot, resolvedCommitment),
      this.connection.getAccountInfo(listChunk, resolvedCommitment),
    ])

    if (!listRootInfo) {
      throw new Error('List root account not found.')
    }
    if (!listChunkInfo) {
      return []
    }

    const listRootAccount = this.program.coder.accounts.decode(
      'listRoot',
      listRootInfo.data,
    ) as AirdropStudioAccounts['listRoot']
    const totalCount = listRootAccount.totalCount
    const recipients = parseListChunk(listChunkInfo.data, totalCount)

    if (offset >= recipients.length) {
      return []
    }
    if (typeof limit === 'number') {
      return recipients.slice(offset, offset + limit)
    }
    return recipients.slice(offset)
  }

  async fetchClaimStatusFromLeaf({
    airdrop,
    leaf,
    commitment,
  }: FetchClaimStatusFromLeafArgs): Promise<AirdropStudioAccounts['claimStatus'] | null> {
    const resolvedCommitment = this.resolveCommitment(commitment)
    const claimStatus = this.pdas.claimStatusFromLeaf(airdrop, leaf)
    return this.program.account.claimStatus.fetchNullable(claimStatus, resolvedCommitment)
  }

  async fetchClaimStatusFromIndex({
    airdrop,
    entryIndex,
    commitment,
  }: FetchClaimStatusFromIndexArgs): Promise<AirdropStudioAccounts['claimStatus'] | null> {
    const resolvedCommitment = this.resolveCommitment(commitment)
    const claimStatus = this.pdas.claimStatusFromIndex(airdrop, entryIndex)
    return this.program.account.claimStatus.fetchNullable(claimStatus, resolvedCommitment)
  }

  async cancelMerkleAirdrop(args: CancelMerkleAirdropArgs & TransactionBuildOptions) {
    const { payer, commitment, signers, useLookupTable, ...instructionArgs } = args
    const resolvedCommitment = this.resolveCommitment(commitment)
    const instructions = await cancelMerkleAirdropInstruction(
      instructionArgs,
      this.autoInstructionContext(resolvedCommitment),
    )
    return this.buildVersionedTransaction({
      payer,
      instructions,
      commitment: resolvedCommitment,
      signers,
      useLookupTable: useLookupTable ?? 'none',
    })
  }

  async cancelOnchainAirdrop(args: CancelOnchainAirdropArgs & TransactionBuildOptions) {
    const { payer, commitment, signers, useLookupTable, ...instructionArgs } = args
    const resolvedCommitment = this.resolveCommitment(commitment)
    const instructions = await cancelOnchainAirdropInstruction(
      instructionArgs,
      this.autoInstructionContext(resolvedCommitment),
    )
    return this.buildVersionedTransaction({
      payer,
      instructions,
      commitment: resolvedCommitment,
      signers,
      useLookupTable: useLookupTable ?? 'none',
    })
  }

  async claimMerkleTokens(args: ClaimMerkleTokensArgs & TransactionBuildOptions) {
    const { payer, commitment, signers, useLookupTable, ...instructionArgs } = args
    const resolvedCommitment = this.resolveCommitment(commitment)
    const instructions = await claimMerkleTokensInstruction(
      instructionArgs,
      this.autoInstructionContext(resolvedCommitment),
    )
    return this.buildVersionedTransaction({
      payer,
      instructions,
      commitment: resolvedCommitment,
      signers,
      useLookupTable: useLookupTable ?? 'use',
    })
  }

  async claimOnchainTokens(args: ClaimOnchainTokensArgs & TransactionBuildOptions) {
    const { payer, commitment, signers, useLookupTable, ...instructionArgs } = args
    const resolvedCommitment = this.resolveCommitment(commitment)
    const instructions = await claimOnchainTokensInstruction(
      instructionArgs,
      this.autoInstructionContext(resolvedCommitment),
    )
    return this.buildVersionedTransaction({
      payer,
      instructions,
      commitment: resolvedCommitment,
      signers,
      useLookupTable: useLookupTable ?? 'none',
    })
  }

  async createMerkleAirdrop(args: CreateMerkleAirdropArgs & TransactionBuildOptions) {
    const { payer, commitment, signers, useLookupTable, ...instructionArgs } = args
    const resolvedCommitment = this.resolveCommitment(commitment)
    const instructions = await createMerkleAirdropInstruction(
      instructionArgs,
      this.autoInstructionContext(resolvedCommitment),
    )
    return this.buildVersionedTransaction({
      payer,
      instructions,
      commitment: resolvedCommitment,
      signers,
      useLookupTable: useLookupTable ?? 'none',
    })
  }

  async createOnchainAirdrop(args: CreateOnchainAirdropArgs & TransactionBuildOptions) {
    const { payer, commitment, signers, useLookupTable, ...instructionArgs } = args
    const resolvedCommitment = this.resolveCommitment(commitment)
    const instructions = await createOnchainAirdropInstruction(
      instructionArgs,
      this.autoInstructionContext(resolvedCommitment),
    )
    return this.buildVersionedTransaction({
      payer,
      instructions,
      commitment: resolvedCommitment,
      signers,
      useLookupTable: useLookupTable ?? 'none',
    })
  }

  async depositMerkleAirdrop(args: DepositMerkleAirdropArgs & TransactionBuildOptions) {
    const { payer, commitment, signers, useLookupTable, ...instructionArgs } = args
    const resolvedCommitment = this.resolveCommitment(commitment)
    const instructions = await depositMerkleAirdropInstruction(
      instructionArgs,
      this.autoInstructionContext(resolvedCommitment),
    )
    return this.buildVersionedTransaction({
      payer,
      instructions,
      commitment: resolvedCommitment,
      signers,
      useLookupTable: useLookupTable ?? 'none',
    })
  }

  async depositOnchainAirdrop(args: DepositOnchainAirdropArgs & TransactionBuildOptions) {
    const { payer, commitment, signers, useLookupTable, ...instructionArgs } = args
    const resolvedCommitment = this.resolveCommitment(commitment)
    const instructions = await depositOnchainAirdropInstruction(
      instructionArgs,
      this.autoInstructionContext(resolvedCommitment),
    )
    return this.buildVersionedTransaction({
      payer,
      instructions,
      commitment: resolvedCommitment,
      signers,
      useLookupTable: useLookupTable ?? 'none',
    })
  }

  async registerMerkleRoot(args: RegisterMerkleRootArgs & TransactionBuildOptions) {
    const { payer, commitment, signers, useLookupTable, ...instructionArgs } = args
    const resolvedCommitment = this.resolveCommitment(commitment)
    const instructions = await registerMerkleRootInstruction(
      instructionArgs,
      this.autoInstructionContext(resolvedCommitment),
    )
    return this.buildVersionedTransaction({
      payer,
      instructions,
      commitment: resolvedCommitment,
      signers,
      useLookupTable: useLookupTable ?? 'none',
    })
  }

  async startMerkleAirdrop(args: StartMerkleAirdropArgs & TransactionBuildOptions) {
    const { payer, commitment, signers, useLookupTable, ...instructionArgs } = args
    const resolvedCommitment = this.resolveCommitment(commitment)
    const instructions = await startMerkleAirdropInstruction(
      instructionArgs,
      this.autoInstructionContext(resolvedCommitment),
    )
    return this.buildVersionedTransaction({
      payer,
      instructions,
      commitment: resolvedCommitment,
      signers,
      useLookupTable: useLookupTable ?? 'none',
    })
  }

  async startOnchainAirdrop(args: StartOnchainAirdropArgs & TransactionBuildOptions) {
    const { payer, commitment, signers, useLookupTable, ...instructionArgs } = args
    const resolvedCommitment = this.resolveCommitment(commitment)
    const instructions = await startOnchainAirdropInstruction(
      instructionArgs,
      this.autoInstructionContext(resolvedCommitment),
    )
    return this.buildVersionedTransaction({
      payer,
      instructions,
      commitment: resolvedCommitment,
      signers,
      useLookupTable: useLookupTable ?? 'none',
    })
  }

  async withdrawMerkleAirdrop(args: WithdrawMerkleAirdropArgs & TransactionBuildOptions) {
    const { payer, commitment, signers, useLookupTable, ...instructionArgs } = args
    const resolvedCommitment = this.resolveCommitment(commitment)
    const instructions = await withdrawMerkleAirdropInstruction(
      instructionArgs,
      this.autoInstructionContext(resolvedCommitment),
    )
    return this.buildVersionedTransaction({
      payer,
      instructions,
      commitment: resolvedCommitment,
      signers,
      useLookupTable: useLookupTable ?? 'none',
    })
  }

  async withdrawOnchainAirdrop(args: WithdrawOnchainAirdropArgs & TransactionBuildOptions) {
    const { payer, commitment, signers, useLookupTable, ...instructionArgs } = args
    const resolvedCommitment = this.resolveCommitment(commitment)
    const instructions = await withdrawOnchainAirdropInstruction(
      instructionArgs,
      this.autoInstructionContext(resolvedCommitment),
    )
    return this.buildVersionedTransaction({
      payer,
      instructions,
      commitment: resolvedCommitment,
      signers,
      useLookupTable: useLookupTable ?? 'none',
    })
  }

  private resolveCommitment(commitment?: Commitment) {
    return commitment ?? this.defaultCommitment
  }

  private static normalizeNetwork(
    network: AirdropStudioNetwork,
  ): Exclude<AirdropStudioNetwork, 'mainnet'> {
    return network === 'mainnet' ? 'mainnet-beta' : network
  }

  private static isLocalRpcEndpoint(endpoint: string): boolean {
    const value = endpoint.toLowerCase()
    return value.includes('127.0.0.1') || value.includes('localhost')
  }

  private autoInstructionContext(commitment?: Commitment): AutoInstructionContext {
    const resolvedCommitment = this.resolveCommitment(commitment)
    return {
      program: this.program,
      pdas: this.pdas,
      fetchProtocolVault: () => this.fetchProtocolVault(resolvedCommitment),
    }
  }

  private async buildVersionedTransaction({
    payer,
    instructions,
    commitment,
    signers,
    useLookupTable,
  }: BuildTransactionParams): Promise<VersionedTransaction> {
    const resolvedCommitment = this.resolveCommitment(commitment)
    const { blockhash } = await this.connection.getLatestBlockhash(resolvedCommitment)
    const lookupTableAccounts = await this.resolveLookupTableAccounts({
      commitment: resolvedCommitment,
      useLookupTable,
    })
    const message = new TransactionMessage({
      payerKey: payer,
      recentBlockhash: blockhash,
      instructions,
    }).compileToV0Message(lookupTableAccounts)
    const transaction = new VersionedTransaction(message)
    if (signers?.length) {
      transaction.sign(signers)
    }
    return transaction
  }

  private async resolveLookupTableAccounts({
    commitment,
    useLookupTable,
  }: {
    commitment: Commitment
    useLookupTable?: LookupTableUsage
  }): Promise<AddressLookupTableAccount[]> {
    const mode = useLookupTable ?? 'none'
    if (mode === 'none') {
      return []
    }

    const lookupTableAccount = await this.fetchLookupTableAccount(commitment)
    return [lookupTableAccount]
  }

  private async fetchLookupTableAccount(
    commitment: Commitment,
  ): Promise<AddressLookupTableAccount> {
    if (this.lookupTableAccount) {
      return this.lookupTableAccount
    }

    if (!this.lookupTableAddress) {
      throw new Error(
        `Lookup table address is required for endpoint ${this.connection.rpcEndpoint}.`,
      )
    }

    const response = await this.connection.getAddressLookupTable(this.lookupTableAddress, {
      commitment,
    })
    if (!response.value) {
      throw new Error(
        `Lookup table account not found for endpoint ${this.connection.rpcEndpoint}: ${this.lookupTableAddress.toBase58()}`,
      )
    }

    this.lookupTableAccount = response.value
    return response.value
  }
}
