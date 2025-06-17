import { z } from 'zod'

export const CommentSchema = z.object({
  parentId: z.string().optional(),
  name: z.string().min(1),
  email: z.string().email().optional(),
  content: z.string().min(1),
})
