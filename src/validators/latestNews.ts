import { z } from 'zod'

export const latestNewsSchema = z.object({
  date: z.string().min(1),
  title: z.string().min(1),
  subtitle: z.string().min(1),
  image: z.string().url(),
  link: z.string().url(),
})

export const updateLatestNewsSchema = latestNewsSchema.partial()
