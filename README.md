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

The client accepts these commonly used options:

- `connection`
  Solana RPC connection used for reads and transaction building.
- `network`
  Runtime network used by the client. Supported values are `devnet`, `mainnet-beta`, and `mainnet`.
- `defaultCommitment`
  Optional default commitment for account reads and blockhash lookup.
- `lookupTableAddress`
  Optional transaction lookup override for advanced setups.

## Client Usage

The SDK client is designed around two usage patterns:

1. Read on-chain state
   Fetch recipient lists and claim status for existing airdrops.
2. Build transactions
   Create versioned transactions for merkle and on-chain airdrop flows, then sign and send them in your app or backend.

Most transaction methods return a `VersionedTransaction`. The SDK builds the transaction, but sending it is left to the caller.

```ts
import { Connection, PublicKey } from '@solana/web3.js'
import { AirdropStudioClient } from '@bonkit/airdrop-sdk'

const connection = new Connection('https://api.devnet.solana.com', 'confirmed')

const client = await AirdropStudioClient.init({
  connection,
  network: 'devnet',
})

const airdrop = new PublicKey('<replace-with-airdrop-address>')
const recipients = await client.listOnchainRecipients({ airdrop, limit: 10 })

console.log(recipients.length)
```

## Included API Surface

- `AirdropStudioClient`
  Read Airdrop Studio accounts and build versioned transactions for merkle and on-chain airdrop flows.
- `createPdas`
  Derive Airdrop Studio PDAs directly from a program id.
- Merkle builders
  Build roots, derive proofs, and generate claim parameters from recipient input.
- Serialized merkle helpers
  Store compact tree data and derive claim proofs later without precomputing every proof.
- Payload helpers
  Generate fully materialized JSON payloads when you want every proof expanded ahead of time.
- On-chain list helpers
  Decode recipient list chunks and map recipient indices into chunk ranges.
- Mint validation helpers
  Pre-check whether a mint is compatible with Airdrop Studio flows.
- Error helpers
  Normalize low-level program failures into predictable application errors.

## API Reference

### `AirdropStudioClient`

Initialize the client once and reuse it for reads and transaction-building flows.

```ts
const client = await AirdropStudioClient.init({
  connection,
  network: 'devnet',
  defaultCommitment: 'confirmed',
})
```

Common config fields:

- `connection`
  Solana RPC connection used for account reads and transaction building.
- `network`
  Runtime network used by the client. Supported values are `devnet`, `mainnet-beta`, and `mainnet`.
- `defaultCommitment`
  Default commitment used by read methods and blockhash lookup.
- `lookupTableAddress`
  Optional transaction lookup override for advanced setups.

Read methods:

- `listOnchainRecipients({ airdrop, offset?, limit? })`
  Reads and decodes recipients stored in list chunk accounts.
- `fetchClaimStatusFromLeaf({ airdrop, leaf })`
  Looks up a claim status PDA derived from a merkle leaf hash.
- `fetchClaimStatusFromIndex({ airdrop, entryIndex })`
  Looks up a claim status PDA derived from an on-chain entry index.

Transaction methods:

- `createMerkleAirdrop`
- `registerMerkleRoot`
- `depositMerkleAirdrop`
- `startMerkleAirdrop`
- `claimMerkleTokens`
- `withdrawMerkleAirdrop`
- `createOnchainAirdrop`
- `appendOnchainRecipients`
- `depositOnchainAirdrop`
- `startOnchainAirdrop`
- `claimOnchainTokens`
- `withdrawOnchainAirdrop`
- `cancelMerkleAirdrop`
- `cancelOnchainAirdrop`

Each transaction method returns a `VersionedTransaction`. In general, the call shape is:

```ts
const tx = await client.someMethod({
  params,
  accounts,
  payer,
  signers,
})
```

Where:

- `params`
  Instruction-specific values such as merkle roots, claim proofs, or timestamps.
- `accounts`
  The accounts required by that instruction.
- `payer`
  The public key that pays transaction fees.
- `signers`
  Optional signers used to sign the returned transaction before sending.

### `createPdas`

Use `createPdas(programId)` when you need deterministic addresses without creating the client first.

Common PDA builders include:

- `draftIndex(creator)`
- `airdrop(creator, draftIndex)`
- Claim status PDA builders
- List-related PDA builders

This is useful in backends, indexers, migration scripts, and tests where you already know the target program id.

### Merkle builders

Use these helpers to prepare merkle-based airdrops off-chain.

- `buildMerkleTree(recipients, { airdrop, rootIndex })`
  Builds one in-memory tree for a single root. Use it when your full recipient set fits into one root or when you want direct access to one tree object.
- `buildMerkleRoots(recipients, { airdrop, maxRoots?, maxLeavesPerRoot? })`
  Splits recipients into multiple roots when necessary and returns:
  - `rootEntries`, which you pass into `registerMerkleRoot`
  - `trees`, which you keep to derive proofs or claim parameters later
- `getMerkleProof(tree, leafIndex)`
  Derives the proof path for one leaf from an in-memory tree.
- `createClaimMerkleParams(tree, leafIndex)`
  Builds the `ClaimMerkleParams` object expected by `claimMerkleTokens`.

Use `buildMerkleRoots` when you need both registration data and proof derivation. Use `buildMerkleTree` when you only need one root.

### Serialized merkle helpers

Use these helpers when you want a compact storage format instead of storing a fully materialized proof for every recipient.

- `serializeMerkleTree(tree)`
  Converts one in-memory tree into a JSON-friendly format that stores leaves and layers once.
- `serializeMerkleRoots(result)`
  Serializes the output of `buildMerkleRoots`, including both root entries and trees.
- `getMerkleProofFromSerializedTree(serializedTree, leafIndex)`
  Rebuilds the proof path for one leaf from serialized layers.
- `createClaimMerkleParamsFromSerializedTree(serializedTree, leafIndex)`
  Rebuilds the full claim parameters directly from serialized data.

This path is usually the better choice when storing merkle data in Redis, KV, databases, or object storage for large recipient sets.

### Payload helpers

Use these helpers when you want every proof precomputed and embedded into the output payload.

- `createMerklePayload(leaves)`
  Builds a single-root payload that includes root metadata, leaf hashes, and proofs.
- `createMerklePayloadBundle(recipients, options)`
  Builds a multi-root payload bundle with all proofs expanded.

This is convenient for static payload distribution, but it produces much larger output than serialized tree storage.

### On-chain list helpers

Use these helpers when your recipient source is on-chain list chunk data.

- `parseListChunk`
  Decodes a full list chunk into recipient entries.
- `parseRecipient`
  Decodes one recipient from serialized list data.
- `parseRecipientAtIndex`
  Decodes one recipient at a given index.
- `getListChunkRange`, `getRecipientRange`, `getListChunkIndex`, `getListChunkOffset`
  Map entry indices to chunk ranges and offsets.

These functions are most useful for readers, explorers, indexers, and custom tooling.

### Mint validation helpers

Use `validateMintForAirdrop` before building transactions when you want to fail early on unsupported or unsafe mint configurations.

### Error helpers

Use `normalizeProgramError`, `getAirdropStudioErrorByCode`, and `getAirdropStudioErrorByName` when you want to translate low-level Solana or Anchor failures into stable application-level messages.

## Examples

### Read on-chain recipients and claim status

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
const firstRecipient = recipients[0]

console.log(recipients.length)

if (firstRecipient) {
  const claimStatus = await client.fetchClaimStatusFromIndex({
    airdrop,
    entryIndex: firstRecipient.entryIndex,
  })

  console.log(claimStatus)
}
```

### Build merkle roots for on-chain registration

```ts
import { BN } from '@coral-xyz/anchor'
import { Keypair, PublicKey } from '@solana/web3.js'
import { buildMerkleRoots } from '@bonkit/airdrop-sdk'

const airdrop = new PublicKey('<replace-with-airdrop-address>')
const recipients = [
  { wallet: Keypair.generate().publicKey, amount: new BN(1_000_000) },
  { wallet: Keypair.generate().publicKey, amount: new BN(2_000_000) },
]

const built = buildMerkleRoots(recipients, { airdrop })

console.log(built.rootEntries)
console.log(built.trees[0].root.hash)
```

Use `rootEntries` when calling `registerMerkleRoot`, and keep `trees` if you want to derive claim proofs later.

### Store a compact serialized merkle tree and derive claim params on demand

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

console.log(serialized.rootEntries[0].leafCount)

const firstRoot = serialized.trees[0]
const claimParams = createClaimMerkleParamsFromSerializedTree(firstRoot, 0)

console.log(claimParams.rootIndex)
console.log(claimParams.leafIndex)
console.log(claimParams.proof.length)
```

This approach is usually better than storing fully materialized payloads when you have a large number of recipients, because the serialized tree stores each node once and derives proofs only when needed.

### Build a transaction with the client

```ts
import { BN } from '@coral-xyz/anchor'
import { Connection, Keypair, PublicKey } from '@solana/web3.js'
import { AirdropStudioClient, createClaimMerkleParamsFromSerializedTree } from '@bonkit/airdrop-sdk'

const connection = new Connection('https://api.devnet.solana.com', 'confirmed')
const payer = Keypair.generate()
const claimant = Keypair.generate()

const client = await AirdropStudioClient.init({
  connection,
  network: 'devnet',
})

const airdrop = new PublicKey('<replace-with-airdrop-address>')
const mint = new PublicKey('<replace-with-mint-address>')
const serializedTree = JSON.parse('<serialized tree JSON>')
const claimParams = createClaimMerkleParamsFromSerializedTree(serializedTree, 0)

const tx = await client.claimMerkleTokens({
  params: claimParams,
  accounts: {
    airdrop,
    mint,
    claimant: claimant.publicKey,
  },
  payer: payer.publicKey,
  signers: [payer, claimant],
})

console.log(tx)
```
