import { z } from 'zod'

export const bannerSchema = z.object({
  title: z.string().min(1),
  image: z.string().url(),
  link: z.string().url(),
  revenue: z.string().optional(),
})

export const updateBannerSchema = bannerSchema.partial()
