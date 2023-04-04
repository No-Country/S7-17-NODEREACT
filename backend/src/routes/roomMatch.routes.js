const { Router } = require("express");
const {
  createRoomSolitary,
  createRoomFriend,
  createRoomRandom,
  getRoomById,
  getAllRoom,
  updateRoom,
  deleteRoom
} = require("../controllers");
const { authenticate } = require("../middlewares/auth.middleware");

const router = Router();

/**
 * @openapi
 * /api/v1/room/solitary:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Create a New Room Solitary.
 *     tags: [Room]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateRoom'
 *     responses:
 *       201:
 *         description: The Room was successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RoomMatch'
 * /api/v1/room/friend:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Create a New Room with Friend.
 *     tags: [Room]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateRoomFriend'
 *     responses:
 *       201:
 *         description: The Room was successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RoomMatch'
 * /api/v1/room/random:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Create a New Room with random player.
 *     tags: [Room]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateRoom'
 *     responses:
 *       201:
 *         description: The Room was successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RoomMatch'
 * /api/v1/room/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get a Room by ID.
 *     tags: [Room]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The Room ID.
 *     responses:
 *       200:
 *         description: The Room was successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RoomMatch'
 * /api/v1/room/{id}/solitary:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: Get a Room by ID.
 *     tags: [Room]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateRoomSolitary'
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The Room ID.
 *     responses:
 *       200:
 *         description: The Room was successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Updated successfull"
 * /api/v1/room/{id}/group:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: Get a Room by ID.
 *     tags: [Room]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateRoomGroup'
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The Room ID.
 *     responses:
 *       200:
 *         description: The Room was successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Updated successfull"
 */

router.post("/room/solitary", authenticate, createRoomSolitary);

router.post("/room/friend" /* , authenticate */, createRoomFriend);

router.post("/room/random", authenticate, createRoomRandom);

router.get("/room/:id", authenticate, getRoomById);

//router.get("/room/user/:id", authenticate, getAllRoom);

router.put("/room/:id/solitary", authenticate, updateRoom);

router.put("/room/:id/group", authenticate, updateRoom);

router.delete("/room/:id", authenticate, deleteRoom);

module.exports = router;
