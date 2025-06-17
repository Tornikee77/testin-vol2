import { Router } from 'express'
import { requireAdmin } from '../middlewares/auth'
import { validate } from '../middlewares/validate'
import { quoteSchema, updateQuoteSchema } from '../validators/quote'
import { createQuote, getAllQuotes, updateQuote, deleteQuote } from '../controllers/quote'

const router = Router()

//public routes

router.get('/', getAllQuotes)

//admin routes

router.post('/', requireAdmin, validate(quoteSchema), createQuote)
router.put('/:id', requireAdmin, validate(updateQuoteSchema), updateQuote)
router.delete('/:id', requireAdmin, deleteQuote)

export default router

/**
 * @swagger
 * tags:
 *   name: Quote
 *   description: Quote management
 */

/**
 * @swagger
 * /api/quote:
 *   get:
 *     summary: Get all quotes
 *     tags: [Quote]
 *     responses:
 *       200:
 *         description: List of quotes
 */

/**
 * @swagger
 * /api/quote:
 *   post:
 *     summary: Create a new quote
 *     tags: [Quote]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - rating
 *               - name
 *               - position
 *             properties:
 *               title:
 *                 type: string
 *                 example: "An exceptional service"
 *               rating:
 *                 type: string
 *                 example: "5"
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               position:
 *                 type: string
 *                 example: "Marketing Manager"
 *     responses:
 *       201:
 *         description: Quote created
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/quote/{id}:
 *   put:
 *     summary: Update a quote
 *     tags: [Quote]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Updated title"
 *               rating:
 *                 type: string
 *                 example: "4"
 *               name:
 *                 type: string
 *                 example: "Jane Smith"
 *               position:
 *                 type: string
 *                 example: "CEO"
 *     responses:
 *       200:
 *         description: Quote updated
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Quote not found
 */

/**
 * @swagger
 * /api/quote/{id}:
 *   delete:
 *     summary: Delete a quote
 *     tags: [Quote]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Quote deleted
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Quote not found
 */
