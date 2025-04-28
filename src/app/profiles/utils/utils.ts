import { Profile } from '../schemas/profile-schema'
import { FounderFormValues } from '../schemas/founder-schema'
import { InvestorFormValues } from '../schemas/investor-schema'

export function formatForInvestorForm(profile: Profile | null): Partial<InvestorFormValues> {
  if (!profile) {
    return {}
  }
  return {
    ...profile,
    fundingStage: Array.isArray(profile.fundingStage)
      ? profile.fundingStage
      : profile.fundingStage
      ? [profile.fundingStage]
      : [],
    industry: Array.isArray(profile.industry) ? profile.industry : [],
    preferredLocation: Array.isArray(profile.preferredLocation) ? profile.preferredLocation : [],
    groups: Array.isArray(profile.groups) ? profile.groups : []
  }
}

export function formatForFounderForm(profile: Profile | null): Partial<FounderFormValues> {
  if (!profile) {
    return {}
  }

  return {
    ...profile,
    fundingStage:
      typeof profile.fundingStage === 'string'
        ? profile.fundingStage
        : Array.isArray(profile.fundingStage)
        ? profile.fundingStage[0]
        : '',
    industry: Array.isArray(profile.industry) ? profile.industry : [],
    preferredLocation: Array.isArray(profile.preferredLocation) ? profile.preferredLocation : [],
    // taxRelief: Array.isArray(profile.taxRelief) ? profile.taxRelief : [],
    groups: Array.isArray(profile.groups) ? profile.groups : [],
    customerGroups: Array.isArray(profile.customerGroups) ? profile.customerGroups : []
  }
}

export function processFormSubmission(values: any, profileType: string): any {
  const result = { ...values }

  if (profileType === 'investor') {
    result.fundingStage = Array.isArray(values.fundingStage)
      ? values.fundingStage
      : values.fundingStage
      ? [values.fundingStage]
      : []
  }


  if (profileType === 'founder') {
    result.fundingStage = Array.isArray(values.fundingStage)
      ? values.fundingStage.length > 0
        ? values.fundingStage[0]
        : ''
      : values.fundingStage || ''
  }

  return result
}
