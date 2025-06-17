import { Router } from 'express'
import { validate } from '../middlewares/validate'
import { requireAdmin } from '../middlewares/auth'
import { getAddress, createAddress, updateAddress, deleteAddress } from '../controllers/address'
import { addressSchema, updateAddressSchema } from '../validators/address'

const router = Router()

//public routes
router.get('/', getAddress)

//admin routes
router.post('/', requireAdmin, validate(addressSchema), createAddress)
router.put('/:id', requireAdmin, validate(updateAddressSchema), updateAddress)
router.delete('/:id', requireAdmin, deleteAddress)

export default router


/**
 * @swagger
 * tags:
 *   name: Address
 *   description: Address management
 */

/**
 * @swagger
 * /api/address:
 *   get:
 *     summary: Get all addresses
 *     tags: [Address]
 *     responses:
 *       200:
 *         description: List of address items
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/address:
 *   post:
 *     summary: Create a new address
 *     tags: [Address]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - street
 *               - city
 *               - country
 *             properties:
 *               street:
 *                 type: string
 *                 example: "123 Main St"
 *               city:
 *                 type: string
 *                 example: "Tbilisi"
 *               country:
 *                 type: string
 *                 example: "Georgia"
 *               postalCode:
 *                 type: string
 *                 example: "0102"
 *     responses:
 *       201:
 *         description: Address created successfully
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/address/{id}:
 *   put:
 *     summary: Update an address
 *     tags: [Address]
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
 *               street:
 *                 type: string
 *                 example: "456 Updated St"
 *               city:
 *                 type: string
 *                 example: "Batumi"
 *               country:
 *                 type: string
 *                 example: "Georgia"
 *               postalCode:
 *                 type: string
 *                 example: "6000"
 *     responses:
 *       200:
 *         description: Address updated successfully
 *       404:
 *         description: Address not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/address/{id}:
 *   delete:
 *     summary: Delete an address
 *     tags: [Address]
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
 *         description: Address deleted successfully
 *       404:
 *         description: Address not found
 *       500:
 *         description: Internal server error
 */
