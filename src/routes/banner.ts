import { Router } from 'express'
import { requireAdmin } from '../middlewares/auth'
import { validate } from '../middlewares/validate'
import { createBanner, updateBanner, deleteBanner, getAllBanner } from '../controllers/banner'
import { bannerSchema, updateBannerSchema } from '../validators/banner'
const router = Router()

//public routes

router.get('/', getAllBanner)

//admin routes

router.post('/', requireAdmin, validate(bannerSchema), createBanner)
router.put('/:id', requireAdmin, validate(updateBannerSchema), updateBanner)
router.delete('/:id', requireAdmin, deleteBanner)

export default router


/**
 * @swagger
 * tags:
 *   name: Banner
 *   description: Banner management
 */

/**
 * @swagger
 * /api/banner:
 *   get:
 *     summary: Get all banner items
 *     tags: [Banner]
 *     responses:
 *       200:
 *         description: List of banner items
 */

/**
 * @swagger
 * /api/banner:
 *   post:
 *     summary: Create a new banner item
 *     tags: [Banner]
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
 *               - image
 *               - link
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Black Friday Sale"
 *               image:
 *                 type: string
 *                 example: "https://example.com/banner.jpg"
 *               link:
 *                 type: string
 *                 example: "https://example.com"
 *               revenue:
 *                 type: string
 *                 example: "$5000"
 *     responses:
 *       201:
 *         description: Banner item created
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/banner/{id}:
 *   put:
 *     summary: Update a banner item
 *     tags: [Banner]
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
 *                 example: "Updated Banner Title"
 *               image:
 *                 type: string
 *                 example: "https://example.com/banner2.jpg"
 *               link:
 *                 type: string
 *                 example: "https://example.com/new"
 *               revenue:
 *                 type: string
 *                 example: "$7000"
 *     responses:
 *       200:
 *         description: Banner item updated
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Banner item not found
 */

/**
 * @swagger
 * /api/banner/{id}:
 *   delete:
 *     summary: Delete a banner item
 *     tags: [Banner]
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
 *         description: Banner item deleted
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Banner item not found
 */
