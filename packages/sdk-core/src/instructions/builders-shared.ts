import type { Program } from '@coral-xyz/anchor'
import { PublicKey } from '@solana/web3.js'

import type { AirdropStudioContract } from 'idl/airdrop-studio-contract'
import type { AirdropStudioPdas } from '../accounts'
import type { PriorityFeeConfig } from '../priority-fee'

export type AutoAccounts<T, K extends keyof T> = Partial<T> & Pick<T, K>

export type AutoInstructionOptions = {
  priorityFee?: PriorityFeeConfig
}

export type AutoInstructionContext = {
  program: Program<AirdropStudioContract>
  pdas: AirdropStudioPdas
  fetchProtocolVault?: () => Promise<PublicKey>
}

export const AirdropActionIndex = {
  CreateOnchainAirdrop: 0,
  CreateMerkleAirdrop: 1,
  RegisterMerkleRoot: 2,
  DepositMerkleAirdrop: 3,
  StartMerkleAirdrop: 4,
  AppendOnchainRecipients: 5,
  DepositOnchainAirdrop: 6,
  StartOnchainAirdrop: 7,
} as const

export const resolvePriorityFee = (options?: AutoInstructionOptions) => options?.priorityFee
