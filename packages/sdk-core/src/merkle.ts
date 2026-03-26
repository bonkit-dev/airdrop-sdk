import { BN } from '@coral-xyz/anchor'
import { PublicKey } from '@solana/web3.js'
import { keccak_256 } from '@noble/hashes/sha3'

import type { ClaimMerkleParams, MerkleProofNode } from '@/types'

export const MAX_MERKLE_URI_LENGTH = 256
export const MAX_MERKLE_ROOTS = 4
export const MAX_MERKLE_PROOF_LEN = 18
export const MAX_MERKLE_LEAVES_PER_ROOT = 1 << MAX_MERKLE_PROOF_LEN

export type MerkleRecipientInput = {
  wallet: PublicKey
  amount: BN
}

export type AirdropMerkleLeafInput = {
  wallet: PublicKey
  airdrop: PublicKey
  rootIndex: number
  leafIndex: number
  amount: BN
}

export type MerkleNode = {
  hash: Uint8Array
  sum: BN
}

export type MerkleLeafNode = MerkleNode & {
  leaf: AirdropMerkleLeafInput
}

export type MerkleTree = {
  leaves: MerkleLeafNode[]
  layers: MerkleNode[][]
  root: MerkleNode
  rootIndex: number
  airdrop: PublicKey
}

export type MerkleHasher = (data: Uint8Array) => Uint8Array
export type MerkleLeafHasher = (leaf: AirdropMerkleLeafInput) => Uint8Array
export type MerkleNodeHasher = (left: MerkleNode, right: MerkleNode) => Uint8Array

export type MerkleTreeOptions = {
  hash?: MerkleHasher
  hashLeaf?: MerkleLeafHasher
  hashNode?: MerkleNodeHasher
}

export type MerkleRootBuildOptions = {
  airdrop: PublicKey
  maxRoots?: number
  maxLeavesPerRoot?: number
  treeOptions?: MerkleTreeOptions
}

export type MerkleRootBuildResult = {
  rootEntries: {
    root: Uint8Array
    leafCount: number
    rootSum: BN
  }[]
  trees: MerkleTree[]
}

export type MerklePayloadProofNode = {
  siblingHash: string
  siblingSum: string
  isLeft: boolean
}

export type MerklePayloadLeaf = {
  wallet: string
  airdrop: string
  rootIndex: number
  leafIndex: number
  amount: string
  hash: string
  proof: MerklePayloadProofNode[]
}

export type MerklePayload = {
  root: {
    airdrop: string
    hash: string
    sum: string
  }
  leaves: MerklePayloadLeaf[]
}

export type MerkleRootPayload = {
  rootIndex: number
  payload: MerklePayload
}

export type MerklePayloadBundle = {
  airdrop: string
  maxLeavesPerRoot: number
  roots: MerkleRootPayload[]
}

export type SerializedMerkleNode = {
  hash: string
  sum: string
}

export type SerializedMerkleLeaf = {
  wallet: string
  airdrop: string
  rootIndex: number
  leafIndex: number
  amount: string
  hash: string
}

export type SerializedMerkleTree = {
  airdrop: string
  rootIndex: number
  leafCount: number
  root: SerializedMerkleNode
  leaves: SerializedMerkleLeaf[]
  layers: SerializedMerkleNode[][]
}

export type SerializedMerkleRootEntry = {
  root: string
  leafCount: number
  rootSum: string
}

export type SerializedMerkleRoots = {
  rootEntries: SerializedMerkleRootEntry[]
  trees: SerializedMerkleTree[]
}

const defaultHash: MerkleHasher = (data) => keccak_256(data)

const chunkMerkleRecipients = (
  recipients: MerkleRecipientInput[],
  options: MerkleRootBuildOptions,
  emptyErrorMessage: string,
) => {
  if (recipients.length === 0) {
    throw new Error(emptyErrorMessage)
  }

  const maxRoots = options.maxRoots ?? MAX_MERKLE_ROOTS
  const maxLeavesPerRoot = options.maxLeavesPerRoot ?? MAX_MERKLE_LEAVES_PER_ROOT

  if (maxRoots <= 0) {
    throw new Error('Max roots must be greater than zero.')
  }
  if (maxLeavesPerRoot <= 0) {
    throw new Error('Max leaves per root must be greater than zero.')
  }

  const chunks: MerkleRecipientInput[][] = []
  for (let i = 0; i < recipients.length; i += maxLeavesPerRoot) {
    chunks.push(recipients.slice(i, i + maxLeavesPerRoot))
  }

  if (chunks.length > maxRoots) {
    throw new Error('Merkle roots exceeds the maximum allowed.')
  }

  return { chunks, maxLeavesPerRoot }
}

const toU32Buffer = (value: number) => {
  const buffer = Buffer.alloc(4)
  buffer.writeUInt32LE(value, 0)
  return buffer
}

const toU64Buffer = (value: BN) => value.toArrayLike(Buffer, 'le', 8)

const toHex = (value: Uint8Array) => Buffer.from(value).toString('hex')

const fromHex = (value: string) => Uint8Array.from(Buffer.from(value, 'hex'))

const serializeMerkleNode = (node: MerkleNode): SerializedMerkleNode => ({
  hash: toHex(node.hash),
  sum: node.sum.toString(),
})

const deserializeMerkleNode = (node: SerializedMerkleNode): MerkleNode => ({
  hash: fromHex(node.hash),
  sum: new BN(node.sum),
})

const ensureLeafIndex = (leafIndex: number) => {
  if (!Number.isInteger(leafIndex) || leafIndex < 0 || leafIndex > 0xffffffff) {
    throw new Error('Leaf index must be a valid u32.')
  }
}

const ensureRootIndex = (rootIndex: number) => {
  if (!Number.isInteger(rootIndex) || rootIndex < 0 || rootIndex > 0xff) {
    throw new Error('Root index must be a valid u8.')
  }
}

export const serializeMerkleLeaf = (leaf: AirdropMerkleLeafInput) => {
  ensureRootIndex(leaf.rootIndex)
  ensureLeafIndex(leaf.leafIndex)
  return Buffer.concat([
    leaf.wallet.toBuffer(),
    leaf.airdrop.toBuffer(),
    Buffer.from([leaf.rootIndex]),
    toU32Buffer(leaf.leafIndex),
    toU64Buffer(leaf.amount),
  ])
}

export const createMerkleLeafHash = (
  leaf: AirdropMerkleLeafInput,
  hashFn: MerkleHasher = defaultHash,
) => {
  const serialized = serializeMerkleLeaf(leaf)
  return hashFn(Buffer.concat([Buffer.from([0x00]), serialized]))
}

const createNodeHash = (left: MerkleNode, right: MerkleNode, hashFn: MerkleHasher = defaultHash) =>
  hashFn(
    Buffer.concat([
      Buffer.from([0x01]),
      Buffer.from(left.hash),
      toU64Buffer(left.sum),
      Buffer.from(right.hash),
      toU64Buffer(right.sum),
    ]),
  )

const resolveLeafHasher = (options?: MerkleTreeOptions): MerkleLeafHasher => {
  if (options?.hashLeaf) {
    return options.hashLeaf
  }

  const hashFn = options?.hash ?? defaultHash
  return (leaf) => createMerkleLeafHash(leaf, hashFn)
}

const resolveNodeHasher = (options?: MerkleTreeOptions): MerkleNodeHasher => {
  if (options?.hashNode) {
    return options.hashNode
  }

  const hashFn = options?.hash ?? defaultHash
  return (left, right) => createNodeHash(left, right, hashFn)
}

const createLeafNode = (
  leaf: AirdropMerkleLeafInput,
  options?: MerkleTreeOptions,
): MerkleLeafNode => ({
  hash: resolveLeafHasher(options)(leaf),
  sum: leaf.amount,
  leaf,
})

const createParentNode = (
  left: MerkleNode,
  right: MerkleNode,
  options?: MerkleTreeOptions,
): MerkleNode => ({
  hash: resolveNodeHasher(options)(left, right),
  sum: left.sum.add(right.sum),
})

const createZeroNode = (): MerkleNode => ({
  hash: new Uint8Array(32),
  sum: new BN(0),
})

const ensureLeafConsistency = (leaves: AirdropMerkleLeafInput[]) => {
  if (leaves.length === 0) {
    throw new Error('Merkle leaves are required.')
  }

  const rootIndex = leaves[0].rootIndex
  const airdrop = leaves[0].airdrop.toBase58()

  leaves.forEach((leaf, index) => {
    if (leaf.leafIndex !== index) {
      throw new Error(`Leaf index mismatch at ${index}.`)
    }
    if (leaf.rootIndex !== rootIndex) {
      throw new Error('All leaves must share the same root index.')
    }
    if (leaf.airdrop.toBase58() !== airdrop) {
      throw new Error('All leaves must share the same airdrop.')
    }
  })
}

export const buildMerkleTree = (
  recipients: MerkleRecipientInput[],
  options: MerkleTreeOptions & { airdrop: PublicKey; rootIndex?: number },
): MerkleTree => {
  if (recipients.length === 0) {
    throw new Error('Merkle tree requires at least one leaf.')
  }
  if (recipients.length > MAX_MERKLE_LEAVES_PER_ROOT) {
    throw new Error('Merkle leaves per root exceeds the maximum allowed.')
  }

  const rootIndex = options.rootIndex ?? 0
  ensureRootIndex(rootIndex)

  const leafNodes = recipients.map((leaf, leafIndex) =>
    createLeafNode(
      {
        wallet: leaf.wallet,
        airdrop: options.airdrop,
        rootIndex,
        leafIndex,
        amount: leaf.amount,
      },
      options,
    ),
  )
  const layers: MerkleNode[][] = [leafNodes]

  while (layers[layers.length - 1].length > 1) {
    const current = layers[layers.length - 1]
    const next: MerkleNode[] = []
    const nodes = current.length % 2 === 1 ? [...current, createZeroNode()] : current

    for (let i = 0; i < nodes.length; i += 2) {
      const left = nodes[i]
      const right = nodes[i + 1]
      next.push(createParentNode(left, right, options))
    }

    layers.push(next)
  }

  return {
    leaves: leafNodes,
    layers,
    root: layers[layers.length - 1][0],
    rootIndex,
    airdrop: options.airdrop,
  }
}

export const serializeMerkleTree = (tree: MerkleTree): SerializedMerkleTree => ({
  airdrop: tree.airdrop.toBase58(),
  rootIndex: tree.rootIndex,
  leafCount: tree.leaves.length,
  root: serializeMerkleNode(tree.root),
  leaves: tree.leaves.map((leafNode) => ({
    wallet: leafNode.leaf.wallet.toBase58(),
    airdrop: leafNode.leaf.airdrop.toBase58(),
    rootIndex: leafNode.leaf.rootIndex,
    leafIndex: leafNode.leaf.leafIndex,
    amount: leafNode.leaf.amount.toString(),
    hash: toHex(leafNode.hash),
  })),
  layers: tree.layers.map((layer) => layer.map(serializeMerkleNode)),
})

export const serializeMerkleRoots = (result: MerkleRootBuildResult): SerializedMerkleRoots => ({
  rootEntries: result.rootEntries.map((entry) => ({
    root: toHex(entry.root),
    leafCount: entry.leafCount,
    rootSum: entry.rootSum.toString(),
  })),
  trees: result.trees.map(serializeMerkleTree),
})

export const createMerklePayload = (
  leaves: AirdropMerkleLeafInput[],
  options?: MerkleTreeOptions,
): MerklePayload => {
  ensureLeafConsistency(leaves)

  const leafNodes: MerkleNode[] = leaves.map((leaf) => ({
    hash: resolveLeafHasher(options)(leaf),
    sum: leaf.amount,
  }))

  const proofNodes = (targetIndex: number): MerkleProofNode[] => {
    let nodes = [...leafNodes]
    const proof: MerkleProofNode[] = []
    let index = targetIndex

    while (nodes.length > 1) {
      if (nodes.length % 2 === 1) {
        nodes = [...nodes, createZeroNode()]
      }

      const isRightNode = index % 2 === 1
      const siblingIndex = isRightNode ? index - 1 : index + 1
      const sibling = nodes[siblingIndex]

      proof.push({
        siblingHash: sibling.hash,
        siblingSum: sibling.sum,
        isLeft: isRightNode,
      })

      const next: MerkleNode[] = []
      for (let i = 0; i < nodes.length; i += 2) {
        const left = nodes[i]
        const right = nodes[i + 1]
        next.push(createParentNode(left, right, options))
      }
      nodes = next
      index = Math.floor(index / 2)
    }

    return proof
  }

  let level = [...leafNodes]
  while (level.length > 1) {
    if (level.length % 2 === 1) {
      level = [...level, createZeroNode()]
    }

    const next: MerkleNode[] = []
    for (let i = 0; i < level.length; i += 2) {
      const left = level[i]
      const right = level[i + 1]
      next.push(createParentNode(left, right, options))
    }
    level = next
  }

  const root = level[0]
  const rootAirdrop = leaves[0].airdrop

  return {
    root: {
      airdrop: rootAirdrop.toBase58(),
      hash: toHex(root.hash),
      sum: root.sum.toString(),
    },
    leaves: leaves.map((leaf, index) => ({
      wallet: leaf.wallet.toBase58(),
      airdrop: leaf.airdrop.toBase58(),
      rootIndex: leaf.rootIndex,
      leafIndex: leaf.leafIndex,
      amount: leaf.amount.toString(),
      hash: toHex(resolveLeafHasher(options)(leaf)),
      proof: proofNodes(index).map((node) => ({
        siblingHash: toHex(node.siblingHash),
        siblingSum: node.siblingSum.toString(),
        isLeft: node.isLeft,
      })),
    })),
  }
}

export const createMerklePayloadBundle = (
  recipients: MerkleRecipientInput[],
  options: MerkleRootBuildOptions,
): MerklePayloadBundle => {
  const { chunks, maxLeavesPerRoot } = chunkMerkleRecipients(
    recipients,
    options,
    'Merkle recipients are required.',
  )

  const roots = chunks.map((chunk, rootIndex) => {
    const leaves = chunk.map((recipient, leafIndex) => ({
      wallet: recipient.wallet,
      airdrop: options.airdrop,
      rootIndex,
      leafIndex,
      amount: recipient.amount,
    }))

    return {
      rootIndex,
      payload: createMerklePayload(leaves, options.treeOptions),
    }
  })

  return {
    airdrop: options.airdrop.toBase58(),
    maxLeavesPerRoot,
    roots,
  }
}

export const buildMerkleRoots = (
  recipients: MerkleRecipientInput[],
  options: MerkleRootBuildOptions,
): MerkleRootBuildResult => {
  const { chunks } = chunkMerkleRecipients(
    recipients,
    options,
    'Merkle roots require at least one recipient.',
  )

  const trees: MerkleTree[] = []
  const rootEntries = chunks.map((chunk, index) => {
    const tree = buildMerkleTree(chunk, {
      airdrop: options.airdrop,
      rootIndex: index,
      ...options.treeOptions,
    })
    const rootSum = chunk.reduce((total, recipient) => total.add(recipient.amount), new BN(0))
    trees.push(tree)
    return {
      root: tree.root.hash,
      leafCount: tree.leaves.length,
      rootSum,
    }
  })

  return { rootEntries, trees }
}

export const getMerkleProof = (tree: MerkleTree, leafIndex: number): MerkleProofNode[] => {
  if (leafIndex < 0 || leafIndex >= tree.leaves.length) {
    throw new Error('Leaf index is out of bounds.')
  }

  const proof: MerkleProofNode[] = []
  let index = leafIndex

  for (let level = 0; level < tree.layers.length - 1; level += 1) {
    const layer = tree.layers[level]
    const nodes = layer.length % 2 === 1 ? [...layer, createZeroNode()] : layer
    const isLeft = index % 2 === 0
    const siblingIndex = isLeft ? index + 1 : index - 1
    const sibling = nodes[siblingIndex]

    proof.push({
      siblingHash: sibling.hash,
      siblingSum: sibling.sum,
      isLeft: !isLeft,
    })

    index = Math.floor(index / 2)
  }

  return proof
}

export const getMerkleProofFromSerializedTree = (
  tree: SerializedMerkleTree,
  leafIndex: number,
): MerkleProofNode[] => {
  if (leafIndex < 0 || leafIndex >= tree.leafCount) {
    throw new Error('Leaf index is out of bounds.')
  }
  if (tree.layers.length === 0) {
    throw new Error('Serialized Merkle tree requires at least one layer.')
  }

  const proof: MerkleProofNode[] = []
  let index = leafIndex

  for (let level = 0; level < tree.layers.length - 1; level += 1) {
    const layer = tree.layers[level].map(deserializeMerkleNode)
    const nodes = layer.length % 2 === 1 ? [...layer, createZeroNode()] : layer
    const isLeft = index % 2 === 0
    const siblingIndex = isLeft ? index + 1 : index - 1
    const sibling = nodes[siblingIndex]

    proof.push({
      siblingHash: sibling.hash,
      siblingSum: sibling.sum,
      isLeft: !isLeft,
    })

    index = Math.floor(index / 2)
  }

  return proof
}

export const verifyMerkleProof = (
  leaf: MerkleNode,
  proof: MerkleProofNode[],
  root: MerkleNode,
  options?: MerkleTreeOptions,
) => {
  let computed: MerkleNode = {
    hash: leaf.hash,
    sum: leaf.sum,
  }

  for (const step of proof) {
    const sibling: MerkleNode = {
      hash: step.siblingHash,
      sum: step.siblingSum,
    }

    computed = step.isLeft
      ? createParentNode(sibling, computed, options)
      : createParentNode(computed, sibling, options)
  }

  return Buffer.from(computed.hash).equals(Buffer.from(root.hash)) && computed.sum.eq(root.sum)
}

export const createClaimMerkleParams = (tree: MerkleTree, leafIndex: number): ClaimMerkleParams => {
  const leafNode = tree.leaves[leafIndex]

  if (!leafNode) {
    throw new Error('Leaf index is out of bounds.')
  }

  return {
    rootIndex: tree.rootIndex,
    leafIndex,
    amount: leafNode.sum,
    leaf: leafNode.hash,
    proof: getMerkleProof(tree, leafIndex),
  }
}

export const createClaimMerkleParamsFromSerializedTree = (
  tree: SerializedMerkleTree,
  leafIndex: number,
): ClaimMerkleParams => {
  const leafNode = tree.leaves[leafIndex]

  if (!leafNode) {
    throw new Error('Leaf index is out of bounds.')
  }
  if (leafNode.leafIndex !== leafIndex) {
    throw new Error(`Serialized leaf index mismatch at ${leafIndex}.`)
  }
  if (leafNode.rootIndex !== tree.rootIndex) {
    throw new Error('Serialized leaf root index mismatch.')
  }

  return {
    rootIndex: tree.rootIndex,
    leafIndex,
    amount: new BN(leafNode.amount),
    leaf: fromHex(leafNode.hash),
    proof: getMerkleProofFromSerializedTree(tree, leafIndex),
  }
}
