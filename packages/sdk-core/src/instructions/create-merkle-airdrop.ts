import { withPriorityFee } from '../priority-fee'
import type { PublicKey } from '@solana/web3.js'

import type { CreateMerkleAirdropParams } from '@/types'
import type { AutoInstructionContext, AutoInstructionOptions } from './builders-shared'
import { AirdropActionIndex, resolvePriorityFee } from './builders-shared'

export type CreateMerkleAirdropAutoAccounts = {
  creator: PublicKey
  mint: PublicKey
  tokenProgram: PublicKey
}

export type CreateMerkleAirdropArgs = {
  params: CreateMerkleAirdropParams
  accounts: CreateMerkleAirdropAutoAccounts
  options?: AutoInstructionOptions
}

export const createMerkleAirdropInstruction = async (
  { params, accounts, options }: CreateMerkleAirdropArgs,
  ctx: AutoInstructionContext,
) => {
  const priorityFee = resolvePriorityFee(options)
  if (!ctx.fetchProtocolVault) {
    throw new Error('Missing fetchProtocolVault in instruction context.')
  }
  const protocolVault = await ctx.fetchProtocolVault()

  const instruction = await ctx.program.methods
    .createMerkleAirdrop(params)
    .accounts({
      protocolConfig: ctx.pdas.protocolConfig(AirdropActionIndex.CreateMerkleAirdrop),
      creator: accounts.creator,
      mint: accounts.mint,
      protocolVault,
      tokenProgram: accounts.tokenProgram,
      program: ctx.program.programId,
    })
    .instruction()

  return withPriorityFee(instruction, priorityFee)
}
