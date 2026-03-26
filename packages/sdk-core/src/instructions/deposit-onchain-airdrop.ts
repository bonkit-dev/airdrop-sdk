import { withPriorityFee } from '../priority-fee'
import type { PublicKey } from '@solana/web3.js'

import type { AutoInstructionContext, AutoInstructionOptions } from './builders-shared'
import { AirdropActionIndex, resolvePriorityFee } from './builders-shared'

export type DepositOnchainAirdropAutoAccounts = {
  creator: PublicKey
  airdrop: PublicKey
  mint: PublicKey
  payerTokenAccount: PublicKey
  tokenProgram: PublicKey
}

export type DepositOnchainAirdropArgs = {
  accounts: DepositOnchainAirdropAutoAccounts
  options?: AutoInstructionOptions
}

export const depositOnchainAirdropInstruction = async (
  { accounts, options }: DepositOnchainAirdropArgs,
  ctx: AutoInstructionContext,
) => {
  const priorityFee = resolvePriorityFee(options)
  if (!ctx.fetchProtocolVault) {
    throw new Error('Missing fetchProtocolVault in instruction context.')
  }
  const protocolVault = await ctx.fetchProtocolVault()
  const vault = ctx.pdas.vaultAta(accounts.airdrop, accounts.mint, accounts.tokenProgram)

  const instruction = await ctx.program.methods
    .depositOnchainAirdrop()
    .accounts({
      creator: accounts.creator,
      protocolConfig: ctx.pdas.protocolConfig(AirdropActionIndex.DepositOnchainAirdrop),
      airdrop: accounts.airdrop,
      mint: accounts.mint,
      vault,
      payerTokenAccount: accounts.payerTokenAccount,
      protocolVault,
      tokenProgram: accounts.tokenProgram,
      program: ctx.program.programId,
    })
    .instruction()

  return withPriorityFee(instruction, priorityFee)
}
