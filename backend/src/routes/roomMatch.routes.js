const { Router } = require("express");
const { getRoomById } = require("../controllers");
const { authenticate } = require("../middlewares/auth.middleware");

const router = Router();

/**
 * @openapi
 * /api/v1/room/friend:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Create a New Room.
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
 *       404:
 *         description: The Room was not created.
 */

router.post("/room/friend", authenticate /* , createRoomFriend */);

router.post("/room/ramdon", authenticate /* , createRoomRandom */);

router.get("/room/:id", authenticate, getRoomById);

router.get("/room", authenticate /* , getAll */);

router.put("/room/:id", authenticate /* , update */);

router.delete("/room/:id", authenticate /* , delete */);

module.exports = router;
