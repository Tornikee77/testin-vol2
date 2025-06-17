import { Router } from 'express'
import { requireAdmin } from '../middlewares/auth'
import { validate } from '../middlewares/validate'
import { latestNewsSchema, updateLatestNewsSchema } from '../validators/latestNews'
import {
  getAllNews,
  createLatestNews,
  updateLatestNews,
  deleteLatestNews,
} from '../controllers/latestNews'

const router = Router()

// user  routes

router.get('/', getAllNews)


// admin routes

router.post('/', requireAdmin, validate(latestNewsSchema), createLatestNews)
router.put('/:id', requireAdmin, validate(updateLatestNewsSchema), updateLatestNews)
router.delete('/:id', requireAdmin, deleteLatestNews)


export default router




/**
 * @swagger
 * tags:
 *   name: LatestNews
 *   description: Latest news entries
 */

/**
 * @swagger
 * /api/latest-news:
 *   get:
 *     summary: Get all latest news entries
 *     tags: [LatestNews]
 *     responses:
 *       200:
 *         description: List of latest news items
 */

/**
 * @swagger
 * /api/latest-news:
 *   post:
 *     summary: Create a latest news entry
 *     tags: [LatestNews]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - date
 *               - title
 *               - image
 *               - subtitle
 *               - link
 *             properties:
 *               date:
 *                 type: string
 *                 example: "2025-05-01"
 *               title:
 *                 type: string
 *                 example: "Grand Opening Event"
 *               image:
 *                 type: string
 *                 example: "https://example.com/image.jpg"
 *               subtitle:
 *                 type: string
 *                 example: "Join us for an exciting launch"
 *               link:
 *                 type: string
 *                 example: "https://example.com/news-details"
 *     responses:
 *       201:
 *         description: News entry created
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/latest-news/{id}:
 *   put:
 *     summary: Update a latest news entry
 *     tags: [LatestNews]
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
 *               date:
 *                 type: string
 *                 example: "2025-05-02"
 *               title:
 *                 type: string
 *                 example: "Updated Event Title"
 *               image:
 *                 type: string
 *                 example: "https://example.com/updated-image.jpg"
 *               subtitle:
 *                 type: string
 *                 example: "Updated subtitle"
 *               link:
 *                 type: string
 *                 example: "https://example.com/updated-link"
 *     responses:
 *       200:
 *         description: News updated
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: News not found
 */

/**
 * @swagger
 * /api/latest-news/{id}:
 *   delete:
 *     summary: Delete a latest news entry
 *     tags: [LatestNews]
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
 *         description: News entry deleted
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: News not found
 */
