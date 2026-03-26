import { getAssociatedTokenAddressSync } from '@solana/spl-token'

import { withPriorityFee } from '../priority-fee'
import type { PublicKey } from '@solana/web3.js'

import type { ClaimMerkleParams } from '@/types'
import type { AutoInstructionContext, AutoInstructionOptions } from './builders-shared'
import { resolvePriorityFee } from './builders-shared'

export type ClaimMerkleTokensAutoAccounts = {
  airdrop: PublicKey
  claimer: PublicKey
  mint: PublicKey
  tokenProgram: PublicKey
}

export type ClaimMerkleTokensArgs = {
  params: ClaimMerkleParams
  accounts: ClaimMerkleTokensAutoAccounts
  options?: AutoInstructionOptions
}

export const claimMerkleTokensInstruction = async (
  { params, accounts, options }: ClaimMerkleTokensArgs,
  ctx: AutoInstructionContext,
) => {
  const priorityFee = resolvePriorityFee(options)
  if (!ctx.fetchProtocolVault) {
    throw new Error('Missing fetchProtocolVault in instruction context.')
  }
  const protocolVault = await ctx.fetchProtocolVault()
  const vault = ctx.pdas.vaultAta(accounts.airdrop, accounts.mint, accounts.tokenProgram)
  const studioConfig = ctx.pdas.studioConfig()
  const claimStatus = ctx.pdas.claimStatusFromLeaf(accounts.airdrop, params.leaf)
  const claimerAta = getAssociatedTokenAddressSync(
    accounts.mint,
    accounts.claimer,
    true,
    accounts.tokenProgram,
  )

  const instruction = await ctx.program.methods
    .claimMerkleTokens(params)
    .accountsPartial({
      airdrop: accounts.airdrop,
      claimer: accounts.claimer,
      studioConfig,
      protocolVault,
      claimerAta,
      mint: accounts.mint,
      vault,
      claimStatus,
      tokenProgram: accounts.tokenProgram,
    })
    .instruction()

  return withPriorityFee(instruction, priorityFee)
}
