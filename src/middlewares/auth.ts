import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'

export const requireAdmin = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.cookies.token
  if (!token) {
    res.status(401).json({ message: 'Unauthorized' })
    return
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload
    ;(req as any).userId = decoded.id
    next()
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' })

  }
}
