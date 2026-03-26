import { BN } from '@coral-xyz/anchor'
import { PublicKey } from '@solana/web3.js'

export const LIST_VERSION = 1
export const RECIPIENT_LEN = 41
export const MAX_RECIPIENTS = 10_000
export const MAX_LIST_BYTES = MAX_RECIPIENTS * RECIPIENT_LEN

export type ListChunkLocation = {
  chunkIndex: number
  offset: number
}

export type OnchainRecipient = {
  wallet: PublicKey
  amount: BN
  claimed: boolean
}

export const getListChunkIndex = (entryIndex: number, chunkSize: number) => {
  if (chunkSize <= 0) {
    throw new Error('Chunk size must be greater than zero.')
  }

  return Math.floor(entryIndex / chunkSize)
}

export const getListChunkOffset = (entryIndex: number, chunkSize: number) => {
  if (chunkSize <= 0) {
    throw new Error('Chunk size must be greater than zero.')
  }

  return entryIndex % chunkSize
}

export const getListChunkLocation = (entryIndex: number, chunkSize: number): ListChunkLocation => ({
  chunkIndex: getListChunkIndex(entryIndex, chunkSize),
  offset: getListChunkOffset(entryIndex, chunkSize),
})

export const getListEntryIndex = (chunkIndex: number, offset: number, chunkSize: number) => {
  if (chunkSize <= 0) {
    throw new Error('Chunk size must be greater than zero.')
  }

  return chunkIndex * chunkSize + offset
}

export const getListChunkRange = (chunkIndex: number, chunkSize: number) => {
  if (chunkSize <= 0) {
    throw new Error('Chunk size must be greater than zero.')
  }

  const start = chunkIndex * chunkSize
  return {
    start,
    endExclusive: start + chunkSize,
  }
}

export const getRecipientRange = (entryIndex: number) => {
  if (entryIndex < 0) {
    throw new Error('Entry index must be non-negative.')
  }
  const start = entryIndex * RECIPIENT_LEN
  return {
    start,
    endExclusive: start + RECIPIENT_LEN,
  }
}

export const parseRecipient = (data: Uint8Array, offset = 0): OnchainRecipient => {
  if (offset < 0 || offset + RECIPIENT_LEN > data.length) {
    throw new Error('Recipient data is out of bounds.')
  }

  const wallet = new PublicKey(data.slice(offset, offset + 32))
  const amount = new BN(data.slice(offset + 32, offset + 40), 'le')
  const claimed = data[offset + 40] !== 0

  return { wallet, amount, claimed }
}

export const parseRecipientAtIndex = (data: Uint8Array, entryIndex: number): OnchainRecipient => {
  const { start } = getRecipientRange(entryIndex)
  return parseRecipient(data, start)
}

export const parseListChunk = (data: Uint8Array, totalCount?: number): OnchainRecipient[] => {
  if (data.length % RECIPIENT_LEN !== 0) {
    throw new Error('List chunk length is not aligned to recipient size.')
  }

  const maxEntries = data.length / RECIPIENT_LEN
  const count = typeof totalCount === 'number' ? Math.min(totalCount, maxEntries) : maxEntries

  const entries: OnchainRecipient[] = []
  for (let i = 0; i < count; i += 1) {
    entries.push(parseRecipientAtIndex(data, i))
  }
  return entries
}
