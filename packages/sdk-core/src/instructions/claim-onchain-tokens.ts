import { getAssociatedTokenAddressSync } from '@solana/spl-token'

import { withPriorityFee } from '../priority-fee'
import type { PublicKey } from '@solana/web3.js'

import type { ClaimOnchainParams } from '@/types'
import type { AutoInstructionContext, AutoInstructionOptions } from './builders-shared'
import { resolvePriorityFee } from './builders-shared'

export type ClaimOnchainTokensAutoAccounts = {
  airdrop: PublicKey
  claimer: PublicKey
  mint: PublicKey
  tokenProgram: PublicKey
}

export type ClaimOnchainTokensArgs = {
  params: ClaimOnchainParams
  accounts: ClaimOnchainTokensAutoAccounts
  options?: AutoInstructionOptions
}

export const claimOnchainTokensInstruction = async (
  { params, accounts, options }: ClaimOnchainTokensArgs,
  ctx: AutoInstructionContext,
) => {
  const priorityFee = resolvePriorityFee(options)
  if (!ctx.fetchProtocolVault) {
    throw new Error('Missing fetchProtocolVault in instruction context.')
  }
  const protocolVault = await ctx.fetchProtocolVault()
  const vault = ctx.pdas.vaultAta(accounts.airdrop, accounts.mint, accounts.tokenProgram)
  const listRoot = ctx.pdas.listRoot(accounts.airdrop)
  const listChunk = ctx.pdas.listChunk(accounts.airdrop)
  const studioConfig = ctx.pdas.studioConfig()
  const claimStatus = ctx.pdas.claimStatusFromIndex(accounts.airdrop, params.entryIndex)
  const eventAuthority = ctx.pdas.eventAuthority()
  const claimerAta = getAssociatedTokenAddressSync(
    accounts.mint,
    accounts.claimer,
    true,
    accounts.tokenProgram,
  )

  const instruction = await ctx.program.methods
    .claimOnchainTokens(params)
    .accountsPartial({
      airdrop: accounts.airdrop,
      listRoot,
      listChunk,
      claimer: accounts.claimer,
      studioConfig,
      protocolVault,
      claimerAta,
      mint: accounts.mint,
      vault,
      claimStatus,
      tokenProgram: accounts.tokenProgram,
      eventAuthority,
      program: ctx.program.programId,
    })
    .instruction()

  return withPriorityFee(instruction, priorityFee)
}
