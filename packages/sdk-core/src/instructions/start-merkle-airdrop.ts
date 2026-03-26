import { withPriorityFee } from '../priority-fee'
import type { PublicKey } from '@solana/web3.js'

import type { StartMerkleAirdropParams } from '@/types'
import type { AutoInstructionContext, AutoInstructionOptions } from './builders-shared'
import { AirdropActionIndex, resolvePriorityFee } from './builders-shared'

export type StartMerkleAirdropAutoAccounts = {
  airdrop: PublicKey
  creator: PublicKey
}

export type StartMerkleAirdropArgs = {
  params: StartMerkleAirdropParams
  accounts: StartMerkleAirdropAutoAccounts
  options?: AutoInstructionOptions
}

export const startMerkleAirdropInstruction = async (
  { params, accounts, options }: StartMerkleAirdropArgs,
  ctx: AutoInstructionContext,
) => {
  const priorityFee = resolvePriorityFee(options)
  if (!ctx.fetchProtocolVault) {
    throw new Error('Missing fetchProtocolVault in instruction context.')
  }
  const protocolVault = await ctx.fetchProtocolVault()

  const instruction = await ctx.program.methods
    .startMerkleAirdrop(params)
    .accounts({
      protocolConfig: ctx.pdas.protocolConfig(AirdropActionIndex.StartMerkleAirdrop),
      airdrop: accounts.airdrop,
      creator: accounts.creator,
      protocolVault,
      program: ctx.program.programId,
    })
    .instruction()

  return withPriorityFee(instruction, priorityFee)
}
