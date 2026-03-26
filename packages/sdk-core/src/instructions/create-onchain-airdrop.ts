import { withPriorityFee } from '../priority-fee'
import type { CreateOnchainAirdropParams } from '@/types'
import type { PublicKey } from '@solana/web3.js'

import type { AutoInstructionContext, AutoInstructionOptions } from './builders-shared'
import { AirdropActionIndex, resolvePriorityFee } from './builders-shared'

export type CreateOnchainAirdropAutoAccounts = {
  creator: PublicKey
  mint: PublicKey
  tokenProgram: PublicKey
}

export type CreateOnchainAirdropArgs = {
  params: CreateOnchainAirdropParams
  accounts: CreateOnchainAirdropAutoAccounts
  options?: AutoInstructionOptions
}

export const createOnchainAirdropInstruction = async (
  { params, accounts, options }: CreateOnchainAirdropArgs,
  ctx: AutoInstructionContext,
) => {
  const priorityFee = resolvePriorityFee(options)
  if (!ctx.fetchProtocolVault) {
    throw new Error('Missing fetchProtocolVault in instruction context.')
  }
  const protocolVault = await ctx.fetchProtocolVault()
  const instruction = await ctx.program.methods
    .createOnchainAirdrop(params)
    .accounts({
      protocolConfig: ctx.pdas.protocolConfig(AirdropActionIndex.CreateOnchainAirdrop),
      creator: accounts.creator,
      mint: accounts.mint,
      protocolVault,
      tokenProgram: accounts.tokenProgram,
      program: ctx.program.programId,
    })
    .instruction()

  return withPriorityFee(instruction, priorityFee)
}
