import type { BN } from '@coral-xyz/anchor'
import type { IdlAccounts, IdlEvents, IdlTypes } from '@coral-xyz/anchor'

import type { AirdropStudioContract } from 'idl/airdrop-studio-contract'

export type AirdropStudioAccounts = IdlAccounts<AirdropStudioContract>
export type AirdropStudioEvents = IdlEvents<AirdropStudioContract>
export type AirdropStudioTypes = IdlTypes<AirdropStudioContract>

export type AirdropAction = AirdropStudioTypes['airdropAction']
export type AirdropBase = AirdropStudioTypes['airdropBase']
export type AirdropProtocolConfig = AirdropStudioTypes['airdropProtocolConfig']
export type AirdropStatus = AirdropStudioTypes['airdropStatus']
export type AirdropStudioConfig = AirdropStudioTypes['airdropStudioConfig']
export type AirdropType = AirdropStudioTypes['airdropType']
export type ClaimStatus = AirdropStudioAccounts['claimStatus']
export type DraftIndex = AirdropStudioTypes['draftIndex']
export type DraftRegistry = AirdropStudioTypes['draftRegistry']
export type ListRoot = AirdropStudioTypes['listRoot']
export type MerkleProofAirdrop = AirdropStudioTypes['merkleProofAirdrop']
export type OnchainListAirdrop = AirdropStudioTypes['onchainListAirdrop']
export type MerkleProofNode = {
  siblingHash: Uint8Array
  siblingSum: BN
  isLeft: boolean
}

export type MerkleRootEntry = {
  root: Uint8Array
  leafCount: number
  rootSum: BN
}

export type AirdropCanceledEvent = AirdropStudioEvents['airdropCanceledEvent']
export type AirdropDraftCreatedEvent = AirdropStudioEvents['airdropDraftCreatedEvent']
export type ClaimTokenEvent = AirdropStudioEvents['claimTokenEvent']
export type CreateConfigEvent = AirdropStudioEvents['createConfigEvent']
export type MerkleAirdropDepositedEvent = AirdropStudioEvents['merkleAirdropDepositedEvent']
export type MerkleAirdropStartedEvent = AirdropStudioEvents['merkleAirdropStartedEvent']
export type OnchainAirdropDepositedEvent = AirdropStudioEvents['onchainAirdropDepositedEvent']
export type OnchainAirdropStartedEvent = AirdropStudioEvents['onchainAirdropStartedEvent']
export type OnchainRecipientsAppendedEvent = AirdropStudioEvents['onchainRecipientsAppendedEvent']
export type UpdateConfigEvent = AirdropStudioEvents['updateConfigEvent']
