const { Router } = require("express");
const { addUserFriend, getUserFriends, acceptFriend, deleteUserFriend } = require("../controllers");
const { authenticate } = require("../middlewares/auth.middleware");

const router = Router();

/**
 * @openapi
 * /api/v1/user/friend:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Add a new frined.
 *     tags: [Friends]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddUserFriend'
 *     responses:
 *       201:
 *         description: The frined was successfully found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserFriend'
 * /api/v1/user/{id}/friends/accept:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get all friends.
 *     tags: [Friends]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user ID.
 *     responses:
 *       200:
 *         description: The frined was successfully found.
 *         content:
 *           application/json:
 *             schema:
 *               type:
 *               items:
 *                 $ref: '#/components/schemas/User'
 * /api/v1/user/{id}/friends/pending:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get all friends pending.
 *     tags: [Friends]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user ID.
 *     responses:
 *       200:
 *         description: The frined was successfully found.
 *         content:
 *           application/json:
 *             schema:
 *               type:
 *               items:
 *                 $ref: '#/components/schemas/User'
 * /api/v1/user/friend/{id}/status:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: Accept or Refuse frined.
 *     description: Accepted values for this Endpoint, "accept" or "refuse".
 *     tags: [Friends]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The frined id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserFriend'
 *     responses:
 *       200:
 *         description: The frined was successfully delete.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Updated successfull"
 * /api/v1/user/friend/delete/{id}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Delete a frined.
 *     description: To remove a friend, you must send the ID of the record where you specify the friendship relationship.
 *     tags: [Friends]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The register frined id
 *     responses:
 *       200:
 *         description: The frined was successfully delete.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Deleted successfull"
 */

router.post("/user/friend", authenticate, addUserFriend);

router.get("/user/:id/friends/accept", authenticate, getUserFriends);

router.get("/user/:id/friends/pending", authenticate, getUserFriends);

router.put("/user/friend/:id/status", authenticate, acceptFriend);

router.delete("/user/friend/delete/:id", authenticate, deleteUserFriend);

module.exports = router;
