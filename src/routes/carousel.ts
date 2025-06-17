import { Router } from 'express'
import { requireAdmin } from '../middlewares/auth'
import { validate } from '../middlewares/validate'
import { carouselSchema ,updateCarouselSchema} from '../validators/carousel'
import {
  getAllCarousel,
  createCarousel,
  updateCarousel,
  deleteCarousel,
} from '../controllers/carousel'

const router = Router()

// public routes

router.get('/', getAllCarousel)

//admin routes

router.post('/', requireAdmin, validate(carouselSchema), createCarousel)
router.put('/:id', requireAdmin, validate(updateCarouselSchema), updateCarousel)
router.delete('/:id', requireAdmin, deleteCarousel)

export default router
/**
 * @swagger
 * tags:
 *   name: Carousel
 *   description: Carousel management
 */

/**
 * @swagger
 * /api/carousel:
 *   get:
 *     summary: Get all carousel items
 *     tags: [Carousel]
 *     responses:
 *       200:
 *         description: List of carousel items
 */

/**
 * @swagger
 * /api/carousel:
 *   post:
 *     summary: Create a new carousel item
 *     tags: [Carousel]
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
 *               - subtitle
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Summer Sale"
 *               image:
 *                 type: string
 *                 example: "https://example.com/image.jpg"
 *               subtitle:
 *                 type: string
 *                 example: "Up to 50% off"
 *               link1:
 *                 type: string
 *                 example: "https://example.com/shop"
 *               link2:
 *                 type: string
 *                 example: "https://example.com/info"
 *     responses:
 *       201:
 *         description: Carousel item created
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/carousel/{id}:
 *   put:
 *     summary: Update a carousel item
 *     tags: [Carousel]
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
 *                 example: "Winter Sale"
 *               image:
 *                 type: string
 *                 example: "https://example.com/image2.jpg"
 *               subtitle:
 *                 type: string
 *                 example: "New Season Deals"
 *               link1:
 *                 type: string
 *                 example: "https://example.com/winter"
 *               link2:
 *                 type: string
 *                 example: "https://example.com/faq"
 *     responses:
 *       200:
 *         description: Carousel item updated
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Carousel item not found
 */

/**
 * @swagger
 * /api/carousel/{id}:
 *   delete:
 *     summary: Delete a carousel item
 *     tags: [Carousel]
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
 *         description: Carousel item deleted
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Carousel item not found
 */
