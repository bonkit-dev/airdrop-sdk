import { BN } from '@coral-xyz/anchor'
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  getAssociatedTokenAddressSync,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token'
import { PublicKey } from '@solana/web3.js'

import { AIRDROP_STUDIO_PROGRAM_ID, AirdropStudioSeed } from './constants'

const toU32Seed = (value: number | BN) => new BN(value).toArrayLike(Buffer, 'le', 4)

const toU8Seed = (value: number | BN) => new BN(value).toArrayLike(Buffer, 'le', 1)

const toFixedBuffer = (value: Uint8Array, length: number) => {
  if (value.length !== length) {
    throw new Error(`Expected ${length} bytes, got ${value.length}.`)
  }

  return Buffer.from(value)
}

export function createPdas(programId: PublicKey = AIRDROP_STUDIO_PROGRAM_ID) {
  return {
    protocolConfig: (action: number | BN) =>
      PublicKey.findProgramAddressSync(
        [Buffer.from(AirdropStudioSeed.ProtocolConfig), toU8Seed(action)],
        programId,
      )[0],
    studioConfig: () =>
      PublicKey.findProgramAddressSync([Buffer.from(AirdropStudioSeed.StudioConfig)], programId)[0],
    draftRegistry: (creator: PublicKey) =>
      PublicKey.findProgramAddressSync(
        [Buffer.from(AirdropStudioSeed.DraftRegistry), creator.toBuffer()],
        programId,
      )[0],
    airdrop: (creator: PublicKey, draftIndex: number | BN) =>
      PublicKey.findProgramAddressSync(
        [Buffer.from(AirdropStudioSeed.Airdrop), creator.toBuffer(), toU32Seed(draftIndex)],
        programId,
      )[0],
    draftIndex: (creator: PublicKey, draftIndex: number | BN) =>
      PublicKey.findProgramAddressSync(
        [Buffer.from(AirdropStudioSeed.DraftIndex), creator.toBuffer(), toU32Seed(draftIndex)],
        programId,
      )[0],
    listRoot: (airdrop: PublicKey) =>
      PublicKey.findProgramAddressSync(
        [Buffer.from(AirdropStudioSeed.ListRoot), airdrop.toBuffer()],
        programId,
      )[0],
    listChunk: (airdrop: PublicKey) =>
      PublicKey.findProgramAddressSync(
        [Buffer.from(AirdropStudioSeed.ListChunk), airdrop.toBuffer()],
        programId,
      )[0],
    claimStatusFromLeaf: (airdrop: PublicKey, leaf: Uint8Array) =>
      PublicKey.findProgramAddressSync(
        [Buffer.from(AirdropStudioSeed.ClaimStatus), airdrop.toBuffer(), toFixedBuffer(leaf, 32)],
        programId,
      )[0],
    claimStatusFromIndex: (airdrop: PublicKey, entryIndex: number | BN) =>
      PublicKey.findProgramAddressSync(
        [Buffer.from(AirdropStudioSeed.ClaimStatus), airdrop.toBuffer(), toU32Seed(entryIndex)],
        programId,
      )[0],
    eventAuthority: () =>
      PublicKey.findProgramAddressSync(
        [Buffer.from(AirdropStudioSeed.EventAuthority)],
        programId,
      )[0],
    vaultAta: (
      airdrop: PublicKey,
      mint: PublicKey,
      tokenProgramId: PublicKey = TOKEN_PROGRAM_ID,
      associatedTokenProgramId: PublicKey = ASSOCIATED_TOKEN_PROGRAM_ID,
    ) =>
      getAssociatedTokenAddressSync(mint, airdrop, true, tokenProgramId, associatedTokenProgramId),
  }
}

export type AirdropStudioPdas = ReturnType<typeof createPdas>
