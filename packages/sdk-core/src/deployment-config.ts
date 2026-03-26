import type { Idl } from '@coral-xyz/anchor'
import { PublicKey } from '@solana/web3.js'

import type { AirdropStudioAltAddresses } from './constants'

export type AirdropStudioDeploymentConfig<TDeployment extends string> = {
  deployment: TDeployment
  programId: PublicKey
  idl: Idl
  networkAltAddresses: AirdropStudioAltAddresses
}
