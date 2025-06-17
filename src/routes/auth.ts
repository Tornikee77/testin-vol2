import { Router } from 'express'
import { register, login } from '../controllers/auth'
import { validate } from '../middlewares/validate'
import { registerSchema, loginSchema } from '../validators/auth'

const router = Router()
router.post('/register', validate(registerSchema), register)
router.post('/login', validate(loginSchema), login)

export default router

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new admin
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       201:
 *         description: Admin registered successfully
 *       400:
 *         description: Bad Request
 */


/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login as admin
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Admin logged in successfully
 *       401:
 *         description: Invalid credentials
 */