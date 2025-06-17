import { Router } from 'express'
import { createBlog, getAllBlogs, getBlogBySlug, updateBlog, deleteBlog } from '../controllers/blog'
import { requireAdmin } from '../middlewares/auth'
import { validate } from '../middlewares/validate'
import { BlogSchema, updateBlogSchema } from '../validators/blog'

const router = Router()

//public routes

router.get('/', getAllBlogs)
router.get('/:slug', getBlogBySlug)

//admin routes

router.post('/', requireAdmin, validate(BlogSchema), createBlog)
router.put('/:id', requireAdmin, validate(updateBlogSchema), updateBlog)
router.delete('/:id', requireAdmin, deleteBlog)

export default router

/**
 * @swagger
 * tags:
 *   name: Blogs
 *   description: Blog management and retrieval
 */

/**
 * @swagger
 * /blogs:
 *   get:
 *     summary: Get all blogs
 *     tags: [Blogs]
 *     responses:
 *       200:
 *         description: List of blogs
 *         content:
 *           application/json:
 *             example:
 *               - id: "1"
 *                 title: "First Blog"
 *                 slug: "first-blog"
 *                 category: "News"
 *                 author: "John Doe"
 *                 content: "<p>Hello World</p>"
 *                 lawWays: "Always verify sources"
 *               - id: "2"
 *                 title: "Second Blog"
 *                 slug: "second-blog"
 *                 category: "Tips"
 *                 author: "Jane Doe"
 *                 content: "<p>Useful tips</p>"
 *                 lawWays: "Consult a lawyer"
 */

/**
 * @swagger
 * /blogs/{slug}:
 *   get:
 *     summary: Get a blog by slug
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: Slug of the blog
 *     responses:
 *       200:
 *         description: Blog object
 *         content:
 *           application/json:
 *             example:
 *               id: "1"
 *               title: "First Blog"
 *               slug: "first-blog"
 *               category: "News"
 *               author: "John Doe"
 *               content: "<p>Hello World</p>"
 *               lawWays: "Always verify sources"
 *       404:
 *         description: Blog not found
 */

/**
 * @swagger
 * /blogs:
 *   post:
 *     summary: Create a new blog
 *     tags: [Blogs]
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
 *               - category
 *               - content
 *               - author
 *               - lawWays
 *             properties:
 *               title:
 *                 type: string
 *               category:
 *                 type: string
 *               content:
 *                 type: string
 *               author:
 *                 type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: url
 *               subtitle:
 *                 type: string
 *               socialLinks:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: url
 *               lawWays:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *           example:
 *             title: "10 Legal Tips for Small Businesses"
 *             category: "Law"
 *             content: "<p>This is a detailed guide on business compliance...</p>"
 *             author: "Jane Doe"
 *             images:
 *               - "https://example.com/image1.jpg"
 *               - "https://example.com/image2.jpg"
 *             subtitle: "A must-read for entrepreneurs"
 *             socialLinks:
 *               - "https://linkedin.com/in/janedoe"
 *             lawWays: "Review contracts with a licensed attorney."
 *             tags: ["legal", "business", "compliance"]
 *     responses:
 *       201:
 *         description: Blog created successfully
 *         content:
 *           application/json:
 *             example:
 *               id: "1"
 *               title: "10 Legal Tips for Small Businesses"
 *               slug: "10-legal-tips-for-small-businesses"
 *               createdAt: "2025-05-12T10:00:00Z"
 */

/**
 * @swagger
 * /blogs/{id}:
 *   put:
 *     summary: Update a blog by ID
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Blog ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               subtitle:
 *                 type: string
 *               content:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *           example:
 *             title: "Updated Legal Tips for Startups"
 *             subtitle: "2025 Edition"
 *             content: "<p>Updated laws you must know in 2025...</p>"
 *             tags: ["legal", "2025", "startups"]
 *     responses:
 *       200:
 *         description: Blog updated
 *         content:
 *           application/json:
 *             example:
 *               message: "Blog updated successfully"
 *               updated: true
 *       404:
 *         description: Blog not found
 */

/**
 * @swagger
 * /blogs/{id}:
 *   delete:
 *     summary: Delete a blog by ID
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Blog ID
 *     responses:
 *       200:
 *         description: Blog deleted
 *         content:
 *           application/json:
 *             example:
 *               message: "Blog deleted"
 *       404:
 *         description: Blog not found
 */
