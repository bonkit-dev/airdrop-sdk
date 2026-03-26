# @bonkit/airdrop-sdk

Public SDK for interacting with the production Airdrop Studio program on Solana.

This repository is a public mirror of the publishable SDK surface only.

## Install

```bash
npm install @bonkit/airdrop-sdk
```

Peer dependencies:

```bash
npm install @coral-xyz/anchor @solana/web3.js @solana/spl-token
```

## Quick Start

```ts
import { Connection } from '@solana/web3.js'
import { AirdropStudioClient } from '@bonkit/airdrop-sdk'

const connection = new Connection('https://api.devnet.solana.com', 'confirmed')

const client = await AirdropStudioClient.init({
  connection,
  network: 'devnet',
})
```

## Included API Surface

- `AirdropStudioClient`
  Production client for fetching accounts and building transactions.
- `createPdas`
  PDA helpers for Airdrop Studio accounts.
- Merkle helpers
  `buildMerkleRoots`, `createClaimMerkleParams`, `createMerklePayloadBundle`.
- List parsing helpers
  `parseListChunk`, `parseRecipient`, `getListChunkRange`.
- Mint validation helpers
  `validateMintForAirdrop`.
- Error helpers
  `normalizeProgramError`, `getAirdropStudioErrorByCode`.

## Example

```ts
import { Connection, PublicKey } from '@solana/web3.js'
import { AirdropStudioClient } from '@bonkit/airdrop-sdk'

const connection = new Connection('https://api.devnet.solana.com', 'confirmed')

const client = await AirdropStudioClient.init({
  connection,
  network: 'devnet',
})

const airdrop = new PublicKey('11111111111111111111111111111111')
const recipients = await client.listOnchainRecipients({ airdrop })

console.log(recipients.length)
```

## Notes

- This package exposes the production deployment surface only.
- Internal program IDs, internal ALT addresses, and internal IDL are intentionally excluded.
