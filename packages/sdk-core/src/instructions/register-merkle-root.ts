import { withPriorityFee } from '../priority-fee'
import type { PublicKey } from '@solana/web3.js'

import type { RegisterMerkleRootParams } from '@/types'
import type { AutoInstructionContext, AutoInstructionOptions } from './builders-shared'
import { AirdropActionIndex, resolvePriorityFee } from './builders-shared'

export type RegisterMerkleRootAutoAccounts = {
  airdrop: PublicKey
  mint: PublicKey
  creator: PublicKey
}

export type RegisterMerkleRootArgs = {
  params: RegisterMerkleRootParams
  accounts: RegisterMerkleRootAutoAccounts
  options?: AutoInstructionOptions
}

export const registerMerkleRootInstruction = async (
  { params, accounts, options }: RegisterMerkleRootArgs,
  ctx: AutoInstructionContext,
) => {
  const priorityFee = resolvePriorityFee(options)
  if (!ctx.fetchProtocolVault) {
    throw new Error('Missing fetchProtocolVault in instruction context.')
  }
  const protocolVault = await ctx.fetchProtocolVault()

  const instruction = await ctx.program.methods
    .registerMerkleRoot(params)
    .accounts({
      airdrop: accounts.airdrop,
      mint: accounts.mint,
      creator: accounts.creator,
      protocolConfig: ctx.pdas.protocolConfig(AirdropActionIndex.RegisterMerkleRoot),
      protocolVault,
      program: ctx.program.programId,
    })
    .instruction()

  return withPriorityFee(instruction, priorityFee)
}
