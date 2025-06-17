import { Router } from 'express'
import { getAllFaqs, createFaq, updateFaq, deleteFaq } from '../controllers/faq'
import { requireAdmin } from '../middlewares/auth'
import { validate } from '../middlewares/validate'
import { faqSchema } from '../validators/faq'

const router = Router()

//public routes
router.get('/', getAllFaqs)

//admin routes
router.post('/', requireAdmin, validate(faqSchema), createFaq)
router.put('/:id', requireAdmin, validate(faqSchema), updateFaq)
router.delete('/:id', requireAdmin, deleteFaq)

export default router

/**
 * @swagger
 * tags:
 *   name: FAQ
 *   description: Frequently Asked Questions management
 */

/**
 * @swagger
 * /api/faq:
 *   get:
 *     summary: Get all FAQ entries
 *     tags: [FAQ]
 *     responses:
 *       200:
 *         description: List of FAQs
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/faq:
 *   post:
 *     summary: Create a new FAQ entry
 *     tags: [FAQ]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - question
 *               - answer
 *             properties:
 *               question:
 *                 type: string
 *                 example: "What is your return policy?"
 *               answer:
 *                 type: string
 *                 example: "You can return any item within 30 days of purchase."
 *     responses:
 *       201:
 *         description: FAQ entry created
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/faq/{id}:
 *   put:
 *     summary: Update an FAQ entry
 *     tags: [FAQ]
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
 *               question:
 *                 type: string
 *                 example: "Updated question text?"
 *               answer:
 *                 type: string
 *                 example: "Updated answer content."
 *     responses:
 *       200:
 *         description: FAQ entry updated
 *       400:
 *         description: FAQ entry not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/faq/{id}:
 *   delete:
 *     summary: Delete an FAQ entry
 *     tags: [FAQ]
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
 *         description: FAQ entry deleted
 *       400:
 *         description: FAQ entry not found
 *       500:
 *         description: Internal server error
 */
