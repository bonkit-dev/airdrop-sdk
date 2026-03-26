import type { Idl } from '@coral-xyz/anchor'

import productionIdl from '../idl/airdrop-studio-contract.json'
import {
  AIRDROP_STUDIO_PROGRAM_ID,
  NETWORK_ALT_ADDRESSES,
  type AirdropStudioAltAddresses,
} from './constants'
import type { AirdropStudioDeploymentConfig as SharedDeploymentConfig } from '../../sdk-core/src/deployment-config'

export type AirdropStudioDeployment = 'production'

export type AirdropStudioDeploymentConfig = SharedDeploymentConfig<AirdropStudioDeployment>

export const DEFAULT_AIRDROP_STUDIO_DEPLOYMENT: AirdropStudioDeployment = 'production'

export const AIRDROP_STUDIO_DEPLOYMENTS: Record<
  AirdropStudioDeployment,
  AirdropStudioDeploymentConfig
> = {
  production: {
    deployment: 'production',
    programId: AIRDROP_STUDIO_PROGRAM_ID,
    idl: productionIdl as Idl,
    networkAltAddresses: NETWORK_ALT_ADDRESSES as AirdropStudioAltAddresses,
  },
}

export const getAirdropStudioDeployment = (
  deployment: AirdropStudioDeployment = DEFAULT_AIRDROP_STUDIO_DEPLOYMENT,
) => AIRDROP_STUDIO_DEPLOYMENTS[deployment]
