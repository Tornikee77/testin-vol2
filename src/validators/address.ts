import z from 'zod'

export const addressSchema = z.object({
  city: z.string().min(1),
  address: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(5).max(15),
})

export const updateAddressSchema = addressSchema.partial()
