import { Router } from 'express'
import { requireAdmin } from '../middlewares/auth'
import { validate } from '../middlewares/validate'
import { teamSchema, teamUpdateSchema } from '../validators/team'
import {
  getAllTeamMembers,
  getTeamMembersById,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
} from '../controllers/team'
const router = Router()

// Public routes
router.get('/', getAllTeamMembers)
router.get('/:id', getTeamMembersById)

// Admin routes
router.post('/', requireAdmin, validate(teamSchema), createTeamMember)
router.put('/:id', requireAdmin, validate(teamUpdateSchema), updateTeamMember)
router.delete('/:id', requireAdmin, deleteTeamMember)

export default router

/**
 * @swagger
 * tags:
 *   name: Team
 *   description: Team member management
 */

/**
 * @swagger
 * /api/team:
 *   get:
 *     summary: Get all team members
 *     tags: [Team]
 *     responses:
 *       200:
 *
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/team/{id}:
 *   get:
 *     summary: Get a team member by ID
 *     tags: [Team]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Found the team member
 *
 *       404:
 *         description: Member not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/team:
 *   post:
 *     summary: Create a new team member
 *     tags: [Team]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TeamMemberInput'
 *     responses:
 *       201:
 *         description: Member created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/team/{id}:
 *   put:
 *     summary: Update a team member
 *     tags: [Team]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TeamMemberInput'
 *     responses:
 *       200:
 *         description: Member updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Member not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/team/{id}:
 *   delete:
 *     summary: Delete a team member
 *     tags: [Team]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Member deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Member not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     TeamMember:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 6628d8d1fb2f3b7efdd6cd88
 *         name:
 *           type: string
 *           example: John Doe
 *         role:
 *           type: string
 *           example: Instructor
 *         bio:
 *           type: string
 *           example: Expert in Krav Maga with 10+ years of experience
 *         image:
 *           type: string
 *           example: https://example.com/image.jpg
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2025-05-11T15:44:13.378Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2025-05-11T15:44:13.378Z"
 *     TeamMemberInput:
 *       type: object
 *       required:
 *         - name
 *         - role
 *         - bio
 *         - image
 *       properties:
 *         name:
 *           type: string
 *           example: John Doe
 *         role:
 *           type: string
 *           example: Instructor
 *         bio:
 *           type: string
 *           example: Expert in Krav Maga with 10+ years of experience
 *         image:
 *           type: string
 *           example: https://example.com/image.jpg
 */
