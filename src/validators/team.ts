import { z } from 'zod'

export const teamSchema = z.object({
  name: z.string().min(1),
  position: z.string().min(1),
  phone: z.string().min(5).max(15).optional(),
  email: z.string().email(),
  subheading: z.string().optional(),
  linkedin: z.string().url().optional(),
  bio: z.string().optional(),
  image: z.string().url(),
  services: z.array(z.string()).optional(),
})

export const teamUpdateSchema = teamSchema.partial()
