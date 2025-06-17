import { z } from 'zod'

export const quoteSchema = z.object({
  title: z.string().min(1),
  rating: z.number().min(1).max(5),
  name: z.string().min(1),
  position: z.string().min(1),
})

export const updateQuoteSchema = quoteSchema.partial()
