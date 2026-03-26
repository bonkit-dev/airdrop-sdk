# @bonkit/airdrop-sdk

TypeScript SDK for interacting with Airdrop Studio on Solana.

## Install

### npm

```bash
npm install @bonkit/airdrop-sdk
```

```bash
npm install @coral-xyz/anchor @solana/web3.js @solana/spl-token
```

### yarn

```bash
yarn add @bonkit/airdrop-sdk
```

```bash
yarn add @coral-xyz/anchor @solana/web3.js @solana/spl-token
```

### pnpm

```bash
pnpm add @bonkit/airdrop-sdk
```

```bash
pnpm add @coral-xyz/anchor @solana/web3.js @solana/spl-token
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
  High-level client for fetching accounts and building versioned transactions for merkle and on-chain airdrops.
- Read helpers
  `fetchStudioConfig`, `fetchProtocolVault`, `listOnchainRecipients`, `fetchClaimStatusFromLeaf`, `fetchClaimStatusFromIndex`.
- Transaction builders
  `createMerkleAirdrop`, `registerMerkleRoot`, `depositMerkleAirdrop`, `startMerkleAirdrop`, `claimMerkleTokens`, `withdrawMerkleAirdrop`, plus the equivalent on-chain airdrop builders.
- `createPdas`
  PDA helpers for Airdrop Studio accounts.
- Merkle helpers
  `buildMerkleRoots`, `buildMerkleTree`, `getMerkleProof`, `createClaimMerkleParams`.
- Serialized merkle helpers
  `serializeMerkleTree`, `serializeMerkleRoots`, `getMerkleProofFromSerializedTree`, `createClaimMerkleParamsFromSerializedTree`.
- Payload helpers
  `createMerklePayload`, `createMerklePayloadBundle` for fully materialized proof payload generation.
- List parsing helpers
  `parseListChunk`, `parseRecipient`, `getListChunkRange`.
- Mint validation helpers
  `validateMintForAirdrop`.
- Error helpers
  `normalizeProgramError`, `getAirdropStudioErrorByCode`.

## Examples

### Read on-chain recipients

```ts
import { Connection, PublicKey } from '@solana/web3.js'
import { AirdropStudioClient } from '@bonkit/airdrop-sdk'

const connection = new Connection('https://api.devnet.solana.com', 'confirmed')

const client = await AirdropStudioClient.init({
  connection,
  network: 'devnet',
})

const airdrop = new PublicKey('<replace-with-airdrop-address>')
const recipients = await client.listOnchainRecipients({ airdrop })

console.log(recipients.length)
```

### Build merkle roots and store a compact serialized tree

```ts
import { BN } from '@coral-xyz/anchor'
import { Keypair, PublicKey } from '@solana/web3.js'
import {
  buildMerkleRoots,
  createClaimMerkleParamsFromSerializedTree,
  serializeMerkleRoots,
} from '@bonkit/airdrop-sdk'

const airdrop = new PublicKey('<replace-with-airdrop-address>')
const recipients = [
  { wallet: Keypair.generate().publicKey, amount: new BN(1_000_000) },
  { wallet: Keypair.generate().publicKey, amount: new BN(2_000_000) },
]

const built = buildMerkleRoots(recipients, { airdrop })
const serialized = serializeMerkleRoots(built)

const firstRoot = serialized.trees[0]
const claimParams = createClaimMerkleParamsFromSerializedTree(firstRoot, 0)

console.log(serialized.rootEntries[0].leafCount)
console.log(claimParams.leafIndex)
```

## Notes

- This package includes only the public Airdrop Studio SDK surface.
- Non-public deployment-specific configuration is intentionally excluded.
- `network` selects the runtime context used by the client.
