// middlewares/validate.ts
import { Request, Response, NextFunction } from 'express'
import { ZodError, ZodSchema } from 'zod'

export const validate = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body)
      next()
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          message: 'Validation Error',
          errors: error.errors.map((err) => ({
            path: err.path.join('.'),
            message: err.message,
          })),
        })
      } else {
        res.status(500).json({ message: 'Internal server error' })
      }
    }
  }
}
