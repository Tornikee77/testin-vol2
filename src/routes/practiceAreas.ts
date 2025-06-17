import { Router } from 'express'
import { requireAdmin } from '../middlewares/auth'
import { validate } from '../middlewares/validate'
import { practiceAreasSchema, updatePracticeAreasSchema } from '../validators/practiceAreas'
import { getallAreas, createAreas, updateAreas, deleteAreas } from '../controllers/practiceAreas'

const router = Router()

//public routes

router.get('/', getallAreas)

//admin routes

router.post('/', requireAdmin, validate(practiceAreasSchema), createAreas)
router.put('/:id', requireAdmin, validate(updatePracticeAreasSchema), updateAreas)
router.delete('/:id', requireAdmin, deleteAreas)

export default router

/**
 * @swagger
 * tags:
 *   name: PracticeAreas
 *   description: Practice areas management
 */

/**
 * @swagger
 * /api/practice-areas:
 *   get:
 *     summary: Get all practice areas
 *     tags: [PracticeAreas]
 *     responses:
 *       200:
 *         description: List of practice areas
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/practice-areas:
 *   post:
 *     summary: Create a new practice area
 *     tags: [PracticeAreas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - topic
 *               - numeration
 *               - image
 *               - title
 *               - text
 *               - link
 *             properties:
 *               topic:
 *                 type: string
 *                 example: "Corporate Law"
 *               numeration:
 *                 type: string
 *                 example: "01"
 *               image:
 *                 type: string
 *                 format: uri
 *                 example: "https://example.com/image.jpg"
 *               title:
 *                 type: string
 *                 example: "Business Regulations"
 *               text:
 *                 type: string
 *                 example: "We help businesses navigate complex legal requirements."
 *               link:
 *                 type: string
 *                 format: uri
 *                 example: "https://example.com/more-info"
 *     responses:
 *       201:
 *         description: Practice area created
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/practice-areas/{id}:
 *   put:
 *     summary: Update a practice area
 *     tags: [PracticeAreas]
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
 *               topic:
 *                 type: string
 *                 example: "Updated Corporate Law"
 *               numeration:
 *                 type: string
 *                 example: "02"
 *               image:
 *                 type: string
 *                 format: uri
 *                 example: "https://example.com/new-image.jpg"
 *               title:
 *                 type: string
 *                 example: "Updated Title"
 *               text:
 *                 type: string
 *                 example: "Updated description text."
 *               link:
 *                 type: string
 *                 format: uri
 *                 example: "https://example.com/updated-info"
 *     responses:
 *       200:
 *         description: Practice area updated
 *       400:
 *         description: Practice area not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/practice-areas/{id}:
 *   delete:
 *     summary: Delete a practice area
 *     tags: [PracticeAreas]
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
 *         description: Practice area deleted
 *       400:
 *         description: Practice area not found
 *       500:
 *         description: Internal server error
 */
