import { z } from 'zod'

export const registrationRequestSchema = z.object({
  requestId: z.string(),
  requesterId: z.string(),
  requesterName: z.string(),
  requesterEmail: z.string().email(),
  requesterRole: z.string(),
  targetId: z.string().optional(),
  targetName: z.string().optional(),
  targetEmail: z.string().email().optional(),
  targetRole: z.string().optional(),
  requestType: z.string(),
  requestTime: z.string(),
  status: z.enum(['Pending', 'Approved', 'Rejected']),
  response: z.string(),
  introSent: z.boolean(),
  requesterNotified: z.boolean()
})

export type RegistrationRequest = z.infer<typeof registrationRequestSchema>
