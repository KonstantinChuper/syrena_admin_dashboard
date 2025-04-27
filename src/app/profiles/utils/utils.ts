import { FounderProfile } from '@/app/profiles/schemas/founder-schema'
import { InvestorProfile } from '@/app/profiles/schemas/investor-schema'

export type Profile = FounderProfile | InvestorProfile

export function isFounderProfile(profile: any): profile is FounderProfile {
  return 'companyName' in profile && 'revenue' in profile
}

export function isInvestorProfile(profile: any): profile is InvestorProfile {
  return 'type' in profile && 'fundingDeployed' in profile
}
