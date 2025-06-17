import z from 'zod'

export const BlogSchema = z.object({
  title: z.string().min(1),
  category: z.string().min(1),
  content: z.string().min(1),
  author: z.string().min(1),
  images: z.array(z.string().url()).optional(),
  subtitle: z.string().optional(),
  socialLinks: z.array(z.string().url()).optional(),
  lawWays: z.string().min(1),
  tags: z.array(z.string()).optional(),
})

export const updateBlogSchema = BlogSchema.partial()

