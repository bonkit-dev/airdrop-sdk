import type { BN } from '@coral-xyz/anchor'
import type { PublicKey } from '@solana/web3.js'

import type { MerkleProofNode, MerkleRootEntry } from './idl'

export type RecipientInput = {
  wallet: PublicKey
  amount: BN
}

export type AppendOnchainRecipientsParams = {
  recipients: RecipientInput[]
}

export type ClaimMerkleParams = {
  rootIndex: number
  leafIndex: number
  amount: BN
  leaf: Uint8Array
  proof: MerkleProofNode[]
}

export type ClaimOnchainParams = {
  entryIndex: number
  amount: BN
}

export type CreateMerkleAirdropParams = {
  draftIndex: number
  startsAt: BN | null
  endsAt: BN | null
}

export type CreateOnchainAirdropParams = {
  draftIndex: number
  startsAt: BN | null
  endsAt: BN | null
}

export type RegisterMerkleRootParams = {
  merkleRoots: MerkleRootEntry[]
  uri: string | null
}

export type StartMerkleAirdropParams = {
  startsAt: BN | null
  endsAt: BN | null
}

export type StartOnchainAirdropParams = {
  startsAt: BN | null
  endsAt: BN | null
}
