import { PublicKey } from '@solana/web3.js'

export const AIRDROP_STUDIO_PROGRAM_ID = new PublicKey(
  'bonkAZceSmwJCcBXknvMjqdUSVJUjnj211w68d2VCei',
)

export type AirdropStudioNetwork = 'devnet' | 'mainnet-beta' | 'mainnet'

export const NETWORK_ALT_ADDRESSES: Record<AirdropStudioNetwork, PublicKey> = {
  devnet: new PublicKey('5jkWrqGsDsFvtMKwXv2Cvjyr85txhnkEJsYSiQeKs9KH'),
  'mainnet-beta': new PublicKey('CvzpP7phMzVcnmErPwYiWvuvu2ejvE8EqJtYEcYBom9B'),
  mainnet: new PublicKey('CvzpP7phMzVcnmErPwYiWvuvu2ejvE8EqJtYEcYBom9B'),
}

export type AirdropStudioAltAddresses = Partial<Record<AirdropStudioNetwork, PublicKey>>

export enum AirdropStudioSeed {
  StudioConfig = 'airdrop-studio-config',
  DraftRegistry = 'draft-reg',
  Airdrop = 'airdrop',
  DraftIndex = 'draft-idx',
  ListRoot = 'list-root',
  ListChunk = 'list-chunk',
  ClaimStatus = 'claim-status',
  EventAuthority = '__event_authority',
  ProtocolConfig = 'cost-config',
}
