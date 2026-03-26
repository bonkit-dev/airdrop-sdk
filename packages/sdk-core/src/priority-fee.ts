import { ComputeBudgetProgram, TransactionInstruction } from '@solana/web3.js'

export type PriorityFeeConfig = {
  computeUnitLimit?: number
  microLamports?: number
}

export const createPriorityFeeInstructions = (
  config?: PriorityFeeConfig,
): TransactionInstruction[] => {
  if (!config) {
    return []
  }

  const instructions: TransactionInstruction[] = []

  if (typeof config.computeUnitLimit === 'number') {
    instructions.push(
      ComputeBudgetProgram.setComputeUnitLimit({
        units: config.computeUnitLimit,
      }),
    )
  }

  if (typeof config.microLamports === 'number') {
    instructions.push(
      ComputeBudgetProgram.setComputeUnitPrice({
        microLamports: config.microLamports,
      }),
    )
  }

  return instructions
}

export const withPriorityFee = (
  instruction: TransactionInstruction | TransactionInstruction[],
  config?: PriorityFeeConfig,
): TransactionInstruction[] => {
  const priorityInstructions = createPriorityFeeInstructions(config)
  const list = Array.isArray(instruction) ? instruction : [instruction]

  return [...priorityInstructions, ...list]
}
