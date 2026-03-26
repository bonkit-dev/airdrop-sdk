import { withPriorityFee } from '../priority-fee'
import type { PublicKey } from '@solana/web3.js'

import type { StartOnchainAirdropParams } from '@/types'
import type { AutoInstructionContext, AutoInstructionOptions } from './builders-shared'
import { AirdropActionIndex, resolvePriorityFee } from './builders-shared'

export type StartOnchainAirdropAutoAccounts = {
  creator: PublicKey
  airdrop: PublicKey
}

export type StartOnchainAirdropArgs = {
  params: StartOnchainAirdropParams
  accounts: StartOnchainAirdropAutoAccounts
  options?: AutoInstructionOptions
}

export const startOnchainAirdropInstruction = async (
  { params, accounts, options }: StartOnchainAirdropArgs,
  ctx: AutoInstructionContext,
) => {
  const priorityFee = resolvePriorityFee(options)
  if (!ctx.fetchProtocolVault) {
    throw new Error('Missing fetchProtocolVault in instruction context.')
  }
  const protocolVault = await ctx.fetchProtocolVault()

  const instruction = await ctx.program.methods
    .startOnchainAirdrop(params)
    .accounts({
      creator: accounts.creator,
      protocolConfig: ctx.pdas.protocolConfig(AirdropActionIndex.StartOnchainAirdrop),
      airdrop: accounts.airdrop,
      protocolVault,
      program: ctx.program.programId,
    })
    .instruction()

  return withPriorityFee(instruction, priorityFee)
}
