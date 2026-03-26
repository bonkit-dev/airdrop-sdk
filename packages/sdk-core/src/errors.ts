import { AnchorError } from '@coral-xyz/anchor'
import type { SimulatedTransactionResponse } from '@solana/web3.js'

import idl from '../idl/airdrop-studio-contract.json'

export type AirdropStudioErrorDefinition = {
  code: number
  name: string
  msg: string
}

type IdlWithErrors = {
  errors?: AirdropStudioErrorDefinition[]
}

const idlErrors: AirdropStudioErrorDefinition[] = (idl as IdlWithErrors).errors ?? []

export const AIRDROP_STUDIO_ERROR_LIST = [...idlErrors]

export const AIRDROP_STUDIO_ERROR_BY_CODE = Object.fromEntries(
  idlErrors.map((error) => [error.code, error]),
) as Record<number, AirdropStudioErrorDefinition>

export const AIRDROP_STUDIO_ERROR_BY_NAME = Object.fromEntries(
  idlErrors.map((error) => [error.name, error]),
) as Record<string, AirdropStudioErrorDefinition>

export const getAirdropStudioErrorByCode = (code: number) => AIRDROP_STUDIO_ERROR_BY_CODE[code]

export const getAirdropStudioErrorByName = (name: string) => AIRDROP_STUDIO_ERROR_BY_NAME[name]

export const getAirdropStudioErrorMessage = (code: number) =>
  AIRDROP_STUDIO_ERROR_BY_CODE[code]?.msg

export type NormalizedProgramError =
  | {
      source: 'anchor'
      anchorError: AnchorError
      logs?: string[]
      originalError: unknown
      definition?: AirdropStudioErrorDefinition
    }
  | {
      source: 'generic'
      error: Error
      logs?: string[]
      originalError: unknown
      definition?: AirdropStudioErrorDefinition
    }

export function normalizeProgramError(error: unknown): NormalizedProgramError {
  if (error instanceof AnchorError) {
    const definition = getDefinitionFromAnchor(error)
    return {
      source: 'anchor',
      anchorError: error,
      logs: error.logs ?? extractLogs(error),
      originalError: error,
      definition,
    }
  }

  const logs = extractLogs(error)
  if (logs) {
    const parsed = AnchorError.parse(logs)
    if (parsed) {
      return {
        source: 'anchor',
        anchorError: parsed,
        logs: parsed.logs ?? logs,
        originalError: error,
        definition: getDefinitionFromAnchor(parsed),
      }
    }
  }

  const coerced = coerceError(error)
  return {
    source: 'generic',
    error: coerced,
    logs,
    originalError: error,
    definition: getDefinitionFromMessage(coerced.message),
  }
}

export function isSimulatedTransactionErrorResponse(
  error: unknown,
): error is SimulatedTransactionResponse {
  if (typeof error !== 'object' || error === null) {
    return false
  }
  return 'err' in error
}

function extractLogs(error: unknown): string[] | undefined {
  if (typeof error !== 'object' || error === null) {
    return undefined
  }

  if ('logs' in error) {
    const logs = (error as { logs?: unknown }).logs
    if (Array.isArray(logs) && logs.every((log) => typeof log === 'string')) {
      return logs
    }
  }
  return undefined
}

function coerceError(error: unknown): Error {
  if (error instanceof Error) {
    return error
  }

  if (isSimulatedTransactionErrorResponse(error)) {
    return new Error(formatSimulationError(error))
  }

  return new Error(error ? String(error) : 'Unknown error')
}

function formatSimulationError(response: SimulatedTransactionResponse): string {
  const err = response.err
  if (!err) {
    return 'Simulated transaction failed without error details'
  }
  if (typeof err === 'string') {
    return `Simulated transaction failed: ${err}`
  }
  if (typeof err === 'object') {
    try {
      return `Simulated transaction failed: ${JSON.stringify(err)}`
    } catch {
      return 'Simulated transaction failed with unknown error'
    }
  }
  return 'Simulated transaction failed with unknown error'
}

function getDefinitionFromAnchor(error: AnchorError): AirdropStudioErrorDefinition | undefined {
  const code = error.error?.errorCode?.number
  if (typeof code === 'number') {
    return getAirdropStudioErrorByCode(code)
  }
  const name = error.error?.errorCode?.code
  if (name) {
    return getAirdropStudioErrorByName(name)
  }
  return undefined
}

function getDefinitionFromMessage(message: string): AirdropStudioErrorDefinition | undefined {
  for (const error of AIRDROP_STUDIO_ERROR_LIST) {
    if (message.includes(error.name) || message.includes(error.msg)) {
      return error
    }
  }
  return undefined
}
