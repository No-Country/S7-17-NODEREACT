const { Router } = require("express");
const { authenticate } = require("../middlewares/auth.middleware");
const {
  createUser,
  getUserById,
  getUsers,
  updateOffline,
  updateUser,
  deleteUser
} = require("../controllers");
const multer = require("multer");

const router = Router();

/**
 * @openapi
 * /api/v1/user/register:
 *   post:
 *     summary: Create a User.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUser'
 *     responses:
 *       201:
 *         description: The User was successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 * /api/v1/user/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get a User by ID.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The User id
 *     responses:
 *       200:
 *         description: The User was successfully found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The User was not found.
 * /api/v1/users:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get a User by ID.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The User id
 *     responses:
 *       200:
 *         description: The User was successfully found.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                $ref: '#/components/schemas/User'
 *       404:
 *         description: The User was not found.
 * /api/v1/user/{id}/ofline:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: Ofline to a User by ID.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The User id.
 *     responses:
 *       200:
 *         description: The User was successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       404:
 *         description: The User was not updated.
 * /api/v1/user/{id}/update:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: Updated a User by ID.
 *     tags: [Users]
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
 *             $ref: '#/components/schemas/UpdateUser'
 *     responses:
 *       200:
 *         description: The User was successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       404:
 *         description: The User was not updated.
 * /api/v1/user/{id}/delete:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Delete a User by ID.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The User id.
 *     responses:
 *       200:
 *         description: The User was successfully deleted.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       404:
 *         description: The User was not deleted.
 */

const upload = multer();

router.post("/user/register", upload.any(), createUser);

router.get("/user/:id", authenticate, getUserById);

router.get("/users", authenticate, getUsers);

router.put("/user/:id/offline", authenticate, updateOffline);

router.put("/user/:id/update", authenticate, updateUser);

router.delete("/user/:id/delete", authenticate, deleteUser);

module.exports = router;
