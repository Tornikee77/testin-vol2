import { Router } from 'express'
import { createComment, getCommentByBlog, deleteComment } from '../controllers/comments'
import { validate } from '../middlewares/validate'
import { CommentSchema } from '../validators/comments'
import { requireAdmin } from '../middlewares/auth'

const router = Router()

//public routes
router.get('/:blogId', getCommentByBlog)
router.post('/:blogId', validate(CommentSchema), createComment)

//private routes
router.delete('/:commentId', requireAdmin, deleteComment)

export default router

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Comment management for blogs
 */

/**
 * @swagger
 * /comments/{blogId}:
 *   get:
 *     summary: Get all comments for a blog
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: blogId
 *         required: true
 *         schema:
 *           type: string
 *         description: Blog ID to fetch comments for
 *     responses:
 *       200:
 *         description: List of comments
 *         content:
 *           application/json:
 *             example:
 *               - id: "abc123"
 *                 blogId: "xyz789"
 *                 author: "Jane Doe"
 *                 text: "Great article!"
 *                 createdAt: "2025-05-12T10:00:00Z"
 *               - id: "def456"
 *                 blogId: "xyz789"
 *                 author: "John Smith"
 *                 text: "Very informative, thanks!"
 *                 createdAt: "2025-05-12T11:00:00Z"
 */

/**
 * @swagger
 * /comments/{blogId}:
 *   post:
 *     summary: Create a comment on a blog
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: blogId
 *         required: true
 *         schema:
 *           type: string
 *         description: Blog ID to comment on
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - author
 *               - text
 *             properties:
 *               author:
 *                 type: string
 *               text:
 *                 type: string
 *           example:
 *             author: "Jane Doe"
 *             text: "This article helped me a lot!"
 *     responses:
 *       201:
 *         description: Comment created successfully
 *         content:
 *           application/json:
 *             example:
 *               id: "abc123"
 *               blogId: "xyz789"
 *               author: "Jane Doe"
 *               text: "This article helped me a lot!"
 *               createdAt: "2025-05-12T10:00:00Z"
 */

/**
 * @swagger
 * /comments/{commentId}:
 *   delete:
 *     summary: Delete a comment
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the comment to delete
 *     responses:
 *       200:
 *         description: Comment deleted
 *         content:
 *           application/json:
 *             example:
 *               message: "Comment deleted successfully"
 *       404:
 *         description: Comment not found
 */
