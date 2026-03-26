import { withPriorityFee } from '../priority-fee'
import type { PublicKey } from '@solana/web3.js'

import type { AppendOnchainRecipientsParams } from '@/types'
import type { AutoInstructionContext, AutoInstructionOptions } from './builders-shared'
import { AirdropActionIndex, resolvePriorityFee } from './builders-shared'

export type AppendOnchainRecipientsAutoAccounts = {
  creator: PublicKey
  airdrop: PublicKey
}

export type AppendOnchainRecipientsArgs = {
  params: AppendOnchainRecipientsParams
  accounts: AppendOnchainRecipientsAutoAccounts
  options?: AutoInstructionOptions
}

export const appendOnchainRecipientsInstruction = async (
  { params, accounts, options }: AppendOnchainRecipientsArgs,
  ctx: AutoInstructionContext,
) => {
  const priorityFee = resolvePriorityFee(options)
  if (!ctx.fetchProtocolVault) {
    throw new Error('Missing fetchProtocolVault in instruction context.')
  }
  const protocolVault = await ctx.fetchProtocolVault()

  const instruction = await ctx.program.methods
    .appendOnchainRecipients(params)
    .accounts({
      creator: accounts.creator,
      protocolConfig: ctx.pdas.protocolConfig(AirdropActionIndex.AppendOnchainRecipients),
      airdrop: accounts.airdrop,
      protocolVault,
      program: ctx.program.programId,
    })
    .instruction()

  return withPriorityFee(instruction, priorityFee)
}
