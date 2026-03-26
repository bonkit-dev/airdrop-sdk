import {
  AirdropStudioClientBase,
  type AirdropStudioClientConfig as BaseAirdropStudioConfig,
  type AirdropStudioProgram,
  type FetchClaimStatusFromIndexArgs,
  type FetchClaimStatusFromLeafArgs,
  type ListOnchainRecipientsArgs,
  type LookupTableUsage,
} from '../../sdk-core/src/client-base'
import {
  getAirdropStudioDeployment,
  type AirdropStudioDeployment,
  type AirdropStudioDeploymentConfig,
} from './deployments'

export type AirdropStudioConfig = Omit<
  BaseAirdropStudioConfig<AirdropStudioDeployment>,
  'deployment'
> & {
  deployment?: AirdropStudioDeployment
}

export { type AirdropStudioProgram, type FetchClaimStatusFromIndexArgs }
export { type FetchClaimStatusFromLeafArgs, type ListOnchainRecipientsArgs, type LookupTableUsage }

export class AirdropStudioClient extends AirdropStudioClientBase<AirdropStudioDeployment> {
  private constructor(
    config: AirdropStudioConfig,
    program: AirdropStudioProgram,
    deploymentConfig: AirdropStudioDeploymentConfig,
  ) {
    super(config, program, deploymentConfig)
  }

  static async init(config: AirdropStudioConfig): Promise<AirdropStudioClient> {
    const deploymentConfig = getAirdropStudioDeployment(config.deployment)
    const program = AirdropStudioClientBase.createProgram(config.connection, deploymentConfig)
    AirdropStudioClientBase.assertProgramIdMatchesDeployment(program, deploymentConfig)

    return new AirdropStudioClient(config, program, deploymentConfig)
  }
}
