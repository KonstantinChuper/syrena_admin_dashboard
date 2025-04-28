import * as z from 'zod'

export const founderSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  industry: z.array(z.string()).min(1, 'This field is required'),
  preferredLocation: z.array(z.string()).min(1, 'This field is required'),
  groups: z.array(z.string()).optional(),
  mobileNumber: z.string().min(8, 'Please enter a valid mobile number'),
  linkedinUrl: z
    .string()
    .min(2, 'Linkedin URL is required')
    .regex(/^https:\/\/[a-z]{2,3}\.linkedin\.com\/.*$/, 'Please enter a valid LinkedIn URL'),
  jobTitle: z.string().min(1, 'Please select a job role'),
  companyName: z.string().min(1, 'Please enter a company name'),
  websiteUrl: z.string().optional(),
  fundingRaised: z.string().optional(),
  fundingRequired: z.string().min(1, 'This field is required'),
  fundingStage: z.string().min(2, 'This field is required'),
  chequesAccepted: z.array(z.string()).min(1, 'This field is required'),
  closeDate: z.string().min(2, 'This field is required'),
  currentFundingStage: z.string().min(2, 'This field is required'),
  revenue: z.string().min(2, 'This field is required'),
  yoyg: z.string().min(2, 'This field is required'),
  profitability: z.string().min(2, 'This field is required'),
  bio: z
    .string()
    .min(10, {
      message: 'Bio must be at least 10 characters.'
    })
    .max(400, {
      message: 'Bio must not be longer than 300 characters.'
    })
    .optional(),
  imageUrl: z.string().optional(),
  pitchDeckUrl: z.string().optional(),
  // added
  // ebitda: z.string().optional(),
  customerGroups: z.array(z.string()).optional(),
  // taxRelief: z.array(z.string()).optional(),
  // productStage: z.string().optional(),
  // customerGroups: z.array(z.string()).optional(),
})

export type FounderFormValues = z.infer<typeof founderSchema>

export interface FounderProfile extends FounderFormValues {
  id: string
}
