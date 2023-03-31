const { Router } = require("express");
const { addUserFriend, getUserFriends, deleteUserFriend } = require("../controllers");
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
 *       404:
 *         description: The frined was not found.
 * /api/v1/user/{id}/friends:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get all new frined.
 *     tags: [Friends]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The frined id
 *     responses:
 *       200:
 *         description: The frined was successfully found.
 *         content:
 *           application/json:
 *             schema:
 *               type:
 *               items:
 *                 $ref: '#/components/schemas/UserFriend'
 *       404:
 *         description: The frined was not found.
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
 *         description: The frined id
 *     responses:
 *       200:
 *         description: The frined was successfully delete.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeletedMessage'
 *       404:
 *         description: The frined was not delete.
 */

router.post("/user/friend", authenticate, addUserFriend);

router.get("/user/:id/friends", authenticate, getUserFriends);

router.delete("/user/friend/delete/:id", authenticate, deleteUserFriend);

module.exports = router;
