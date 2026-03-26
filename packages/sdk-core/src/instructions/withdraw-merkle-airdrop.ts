import { getAssociatedTokenAddressSync } from '@solana/spl-token'

import { withPriorityFee } from '../priority-fee'
import type { PublicKey } from '@solana/web3.js'

import type { AutoInstructionContext, AutoInstructionOptions } from './builders-shared'
import { resolvePriorityFee } from './builders-shared'

export type WithdrawMerkleAirdropAutoAccounts = {
  creator: PublicKey
  airdrop: PublicKey
  mint: PublicKey
  tokenProgram: PublicKey
}

export type WithdrawMerkleAirdropArgs = {
  accounts: WithdrawMerkleAirdropAutoAccounts
  options?: AutoInstructionOptions
}

export const withdrawMerkleAirdropInstruction = async (
  { accounts, options }: WithdrawMerkleAirdropArgs,
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
    .withdrawMerkleAirdrop()
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
