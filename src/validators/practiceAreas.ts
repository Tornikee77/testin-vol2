import { z } from 'zod'

export const practiceAreasSchema = z.object({
  topic: z.string().min(1),
  numeration: z.string().min(1).max(2),
  image: z.string().url(),
  title: z.string().min(1),
  text: z.string().min(1),
  link: z.string().url(),
})

export const updatePracticeAreasSchema = practiceAreasSchema.partial()
