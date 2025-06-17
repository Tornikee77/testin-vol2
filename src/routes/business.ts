import { Router } from 'express'
import {
  createBusiness,
  deleteBusiness,
  getAllBusinesses,
  updateBusiness,
} from '../controllers/business'
import { validate } from '../middlewares/validate'
import { requireAdmin } from '../middlewares/auth'
import { createBusinessSchema } from '../validators/business'

const router = Router()


//public routes
router.get('/', getAllBusinesses)

//admin routes
router.post('/', requireAdmin, validate(createBusinessSchema), createBusiness)
router.put('/:id', requireAdmin, validate(createBusinessSchema),updateBusiness)
router.delete('/:id', requireAdmin, deleteBusiness)

export default router

/**
 * @swagger
 * tags:
 *   name: Business
 *   description: Business section management
 */

/**
 * @swagger
 * /api/business:
 *   get:
 *     summary: Get all business entries
 *     tags: [Business]
 *     responses:
 *       200:
 *         description: List of business items
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/business:
 *   post:
 *     summary: Create a new business entry
 *     tags: [Business]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - icon
 *               - image
 *             properties:
 *               icon:
 *                 type: string
 *                 format: uri
 *                 example: "https://example.com/icon.png"
 *               image:
 *                 type: string
 *                 format: uri
 *                 example: "https://example.com/image.jpg"
 *     responses:
 *       201:
 *         description: Business entry created
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/business/{id}:
 *   put:
 *     summary: Update a business entry
 *     tags: [Business]
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
 *               icon:
 *                 type: string
 *                 format: uri
 *                 example: "https://example.com/new-icon.png"
 *               image:
 *                 type: string
 *                 format: uri
 *                 example: "https://example.com/new-image.jpg"
 *     responses:
 *       200:
 *         description: Business entry updated
 *       400:
 *         description: Business entry not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/business/{id}:
 *   delete:
 *     summary: Delete a business entry
 *     tags: [Business]
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
 *         description: Business entry deleted
 *       400:
 *         description: Business entry not found
 *       500:
 *         description: Internal server error
 */
