import {
  AccountState,
  ExtensionType,
  TOKEN_2022_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  getDefaultAccountState,
  getExtensionTypes,
  unpackMint,
  type Mint,
} from '@solana/spl-token'
import type { Commitment, Connection } from '@solana/web3.js'
import { PublicKey } from '@solana/web3.js'

export const DEFAULT_BLOCKED_MINTS = [
  new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'),
  new PublicKey('Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB'),
  new PublicKey('So11111111111111111111111111111111111111112'),
] as const

// Mirrors the contract allowlist in `utils/token_2022.rs`.
const ALLOWED_TOKEN_2022_MINT_EXTENSIONS = new Set<number>([
  ExtensionType.TransferFeeConfig,
  ExtensionType.MintCloseAuthority,
  ExtensionType.DefaultAccountState,
  ExtensionType.InterestBearingConfig,
  ExtensionType.MetadataPointer,
  ExtensionType.TokenMetadata,
  ExtensionType.GroupPointer,
  ExtensionType.TokenGroup,
  ExtensionType.GroupMemberPointer,
  ExtensionType.TokenGroupMember,
  ExtensionType.ScaledUiAmountConfig,
])

export const MintValidationIssueCode = {
  MintAccountNotFound: 'mint-account-not-found',
  MintAccountFetchFailed: 'mint-account-fetch-failed',
  InvalidTokenProgram: 'invalid-token-program',
  MintOwnerProgramMismatch: 'mint-owner-program-mismatch',
  MintUnpackFailed: 'mint-unpack-failed',
  UnsupportedMint: 'unsupported-mint',
  MintNotInitialized: 'mint-not-initialized',
  MintSupplyZero: 'mint-supply-zero',
  MintFreezeAuthorityNotAllowed: 'mint-freeze-authority-not-allowed',
  Token2022ExtensionParseFailed: 'token-2022-extension-parse-failed',
  UnsupportedToken2022MintExtension: 'unsupported-token-2022-mint-extension',
  Token2022DefaultAccountStateNotInitialized: 'token-2022-default-account-state-not-initialized',
} as const

export type MintValidationIssueCode =
  (typeof MintValidationIssueCode)[keyof typeof MintValidationIssueCode]

export type MintValidationIssue = {
  code: MintValidationIssueCode
  message: string
  extensionType?: ExtensionType
  extensionName?: string
}

export type MintValidationStatus = 'valid' | 'invalid'

export type MintValidationMintState = {
  address: PublicKey
  supply: bigint
  freezeAuthority: PublicKey | null
  isInitialized?: boolean
  tlvData?: Buffer | Uint8Array
}

export type MintValidationByAddressInput = {
  connection: Connection
  mintAddress: PublicKey
  tokenProgramId?: PublicKey
  commitment?: Commitment
  blockedMints?: readonly PublicKey[]
}

export type MintValidationByStateInput = {
  mintState: MintValidationMintState
  tokenProgramId: PublicKey
  mintOwnerProgramId?: PublicKey
  blockedMints?: readonly PublicKey[]
}

export type ValidateMintForAirdropInput = MintValidationByAddressInput | MintValidationByStateInput

export type MintValidationResult = {
  status: MintValidationStatus
  isValid: boolean
  mintAddress: PublicKey | null
  tokenProgramId: PublicKey | null
  mintOwnerProgramId: PublicKey | null
  extensionTypes: ExtensionType[]
  issues: MintValidationIssue[]
}

const isSupportedTokenProgram = (programId: PublicKey) =>
  programId.equals(TOKEN_PROGRAM_ID) || programId.equals(TOKEN_2022_PROGRAM_ID)

const extensionNameOf = (extensionType: ExtensionType) =>
  ExtensionType[extensionType] ?? `Unknown(${extensionType})`

const pushIssue = (issues: MintValidationIssue[], issue: MintValidationIssue) => {
  issues.push(issue)
}

const validateMintStateCommon = ({
  mintState,
  tokenProgramId,
  blockedMints,
  issues,
}: {
  mintState: MintValidationMintState
  tokenProgramId: PublicKey | null
  blockedMints: readonly PublicKey[]
  issues: MintValidationIssue[]
}): ExtensionType[] => {
  const extensionTypes: ExtensionType[] = []

  if (blockedMints.some((blockedMint) => blockedMint.equals(mintState.address))) {
    pushIssue(issues, {
      code: MintValidationIssueCode.UnsupportedMint,
      message: 'Mint is blocked by airdrop policy.',
    })
  }

  if (mintState.isInitialized === false) {
    pushIssue(issues, {
      code: MintValidationIssueCode.MintNotInitialized,
      message: 'Mint account is not initialized.',
    })
  }

  if (mintState.supply <= 0n) {
    pushIssue(issues, {
      code: MintValidationIssueCode.MintSupplyZero,
      message: 'Mint supply must be greater than zero.',
    })
  }

  if (mintState.freezeAuthority) {
    pushIssue(issues, {
      code: MintValidationIssueCode.MintFreezeAuthorityNotAllowed,
      message: 'Mint freeze authority must be unset.',
    })
  }

  if (!tokenProgramId || !tokenProgramId.equals(TOKEN_2022_PROGRAM_ID)) {
    return extensionTypes
  }

  const tlvData = Buffer.from(mintState.tlvData ?? Buffer.alloc(0))
  try {
    extensionTypes.push(...getExtensionTypes(tlvData))
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    pushIssue(issues, {
      code: MintValidationIssueCode.Token2022ExtensionParseFailed,
      message: `Failed to parse Token-2022 extensions: ${message}`,
    })
    return extensionTypes
  }

  for (const extensionType of extensionTypes) {
    if (ALLOWED_TOKEN_2022_MINT_EXTENSIONS.has(extensionType)) {
      continue
    }

    pushIssue(issues, {
      code: MintValidationIssueCode.UnsupportedToken2022MintExtension,
      message: `Unsupported Token-2022 mint extension: ${extensionNameOf(extensionType)}.`,
      extensionType,
      extensionName: extensionNameOf(extensionType),
    })
  }

  const mintForExtensionChecks: Mint = {
    address: mintState.address,
    mintAuthority: null,
    supply: mintState.supply,
    decimals: 0,
    isInitialized: mintState.isInitialized ?? true,
    freezeAuthority: mintState.freezeAuthority,
    tlvData,
  }
  const defaultAccountState = getDefaultAccountState(mintForExtensionChecks)
  if (defaultAccountState && defaultAccountState.state !== AccountState.Initialized) {
    pushIssue(issues, {
      code: MintValidationIssueCode.Token2022DefaultAccountStateNotInitialized,
      message: 'Token-2022 default account state must be Initialized.',
    })
  }

  return extensionTypes
}

export const validateMintForAirdrop = async (
  input: ValidateMintForAirdropInput,
): Promise<MintValidationResult> => {
  const issues: MintValidationIssue[] = []
  const blockedMints = input.blockedMints ?? DEFAULT_BLOCKED_MINTS

  let mintAddress: PublicKey | null
  let tokenProgramId: PublicKey | null
  let mintOwnerProgramId: PublicKey | null = null
  let mintState: MintValidationMintState | null = null

  if ('mintAddress' in input) {
    mintAddress = input.mintAddress

    let accountInfo: Awaited<ReturnType<Connection['getAccountInfo']>>
    try {
      accountInfo = await input.connection.getAccountInfo(input.mintAddress, input.commitment)
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      pushIssue(issues, {
        code: MintValidationIssueCode.MintAccountFetchFailed,
        message: `Failed to fetch mint account: ${message}`,
      })

      tokenProgramId = input.tokenProgramId ?? null
      if (tokenProgramId && !isSupportedTokenProgram(tokenProgramId)) {
        pushIssue(issues, {
          code: MintValidationIssueCode.InvalidTokenProgram,
          message: 'Token program must be SPL Token or Token-2022.',
        })
      }

      return {
        status: 'invalid',
        isValid: false,
        mintAddress,
        tokenProgramId,
        mintOwnerProgramId,
        extensionTypes: [],
        issues,
      }
    }

    if (!accountInfo) {
      tokenProgramId = input.tokenProgramId ?? null
      pushIssue(issues, {
        code: MintValidationIssueCode.MintAccountNotFound,
        message: 'Mint account was not found.',
      })
      if (tokenProgramId && !isSupportedTokenProgram(tokenProgramId)) {
        pushIssue(issues, {
          code: MintValidationIssueCode.InvalidTokenProgram,
          message: 'Token program must be SPL Token or Token-2022.',
        })
      }

      return {
        status: 'invalid',
        isValid: false,
        mintAddress,
        tokenProgramId,
        mintOwnerProgramId,
        extensionTypes: [],
        issues,
      }
    }

    mintOwnerProgramId = accountInfo.owner
    tokenProgramId = input.tokenProgramId ?? mintOwnerProgramId
    if (!isSupportedTokenProgram(tokenProgramId)) {
      pushIssue(issues, {
        code: MintValidationIssueCode.InvalidTokenProgram,
        message: 'Token program must be SPL Token or Token-2022.',
      })
    }
    if (!mintOwnerProgramId.equals(tokenProgramId)) {
      pushIssue(issues, {
        code: MintValidationIssueCode.MintOwnerProgramMismatch,
        message: 'Mint owner program does not match selected token program.',
      })
    }

    const unpackProgramId = isSupportedTokenProgram(mintOwnerProgramId)
      ? mintOwnerProgramId
      : tokenProgramId
    if (isSupportedTokenProgram(unpackProgramId)) {
      try {
        const unpacked = unpackMint(input.mintAddress, accountInfo, unpackProgramId)
        mintState = {
          address: unpacked.address,
          supply: unpacked.supply,
          freezeAuthority: unpacked.freezeAuthority,
          isInitialized: unpacked.isInitialized,
          tlvData: unpacked.tlvData,
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error)
        pushIssue(issues, {
          code: MintValidationIssueCode.MintUnpackFailed,
          message: `Failed to decode mint account: ${message}`,
        })
      }
    }
  } else {
    mintState = input.mintState
    mintAddress = input.mintState.address
    tokenProgramId = input.tokenProgramId
    mintOwnerProgramId = input.mintOwnerProgramId ?? null

    if (!isSupportedTokenProgram(tokenProgramId)) {
      pushIssue(issues, {
        code: MintValidationIssueCode.InvalidTokenProgram,
        message: 'Token program must be SPL Token or Token-2022.',
      })
    }
    if (mintOwnerProgramId && !mintOwnerProgramId.equals(tokenProgramId)) {
      pushIssue(issues, {
        code: MintValidationIssueCode.MintOwnerProgramMismatch,
        message: 'Mint owner program does not match selected token program.',
      })
    }
  }

  const extensionTypes = mintState
    ? validateMintStateCommon({
        mintState,
        tokenProgramId,
        blockedMints,
        issues,
      })
    : []

  const isValid = issues.length === 0
  return {
    status: isValid ? 'valid' : 'invalid',
    isValid,
    mintAddress,
    tokenProgramId,
    mintOwnerProgramId,
    extensionTypes,
    issues,
  }
}
