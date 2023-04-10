const { Router } = require("express");
const { getAdvantages, getUserAdvantages, updateUserAdvantages } = require("../controllers");

const router = Router();

/**
 * @openapi
 * /api/v1/advantages/all:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get an array of all advantages.
 *     tags: [Advantages]
 *     responses:
 *       200:
 *         description: The advantages were successfully found.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Advantage'
 * /api/v1/advantages/user/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get an array of advantages from a particular user by their id.
 *     tags: [Advantages]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The User id
 *     responses:
 *       200:
 *         description: The advantages of the user were successfully found.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   quantity:
 *                     type: integer
 *                   advantageId:
 *                     type: integer
 *               example:
 *                 - quantity: 10
 *                   advantageId: 1
 *                 - quantity: 5
 *                   advantageId: 2
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: Update advantages from a particular user by their id.
 *     tags: [Advantages]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The User id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserAdvantages'
 *     responses:
 *       200:
 *         description: The advantages of the user were successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User's advantages updated successfully"
 */

router.get("/advantages/all", getAdvantages);
router.get("/advantages/user/:id", getUserAdvantages);
router.put("/advantages/user/:id", updateUserAdvantages);

module.exports = router;
