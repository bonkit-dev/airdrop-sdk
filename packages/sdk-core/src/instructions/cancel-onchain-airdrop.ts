import { getAssociatedTokenAddressSync } from '@solana/spl-token'

import { withPriorityFee } from '../priority-fee'
import type { PublicKey } from '@solana/web3.js'

import type { AutoInstructionContext, AutoInstructionOptions } from './builders-shared'
import { resolvePriorityFee } from './builders-shared'

export type CancelOnchainAirdropAutoAccounts = {
  creator: PublicKey
  airdrop: PublicKey
  mint: PublicKey
  tokenProgram: PublicKey
}

export type CancelOnchainAirdropArgs = {
  accounts: CancelOnchainAirdropAutoAccounts
  options?: AutoInstructionOptions
}

export const cancelOnchainAirdropInstruction = async (
  { accounts, options }: CancelOnchainAirdropArgs,
  ctx: AutoInstructionContext,
) => {
  const priorityFee = resolvePriorityFee(options)
  const vault = ctx.pdas.vaultAta(accounts.airdrop, accounts.mint, accounts.tokenProgram)
  const creatorTokenAccount = getAssociatedTokenAddressSync(
    accounts.mint,
    accounts.creator,
    true,
    accounts.tokenProgram,
  )

  const instruction = await ctx.program.methods
    .cancelOnchainAirdrop()
    .accounts({
      creator: accounts.creator,
      airdrop: accounts.airdrop,
      mint: accounts.mint,
      vault,
      creatorTokenAccount,
      tokenProgram: accounts.tokenProgram,
      program: ctx.program.programId,
    })
    .instruction()

  return withPriorityFee(instruction, priorityFee)
}
