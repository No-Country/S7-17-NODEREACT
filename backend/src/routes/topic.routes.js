const { Router } = require("express");
const { getTopics, getUserTopics } = require("../controllers");
const { authenticate } = require("../middlewares/auth.middleware");

const router = Router();

/**
 * @openapi
 * /api/v1/topics/all:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get an array of all topics.
 *     tags: [Topics]
 *     responses:
 *       200:
 *         description: The topics were successfully found.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Topic'
 * /api/v1/topics/user/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get an array of topics by user.
 *     tags: [Topics]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The User id
 *     responses:
 *       200:
 *         description: The topics were successfully found.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Topic'
 */

router.get("/topics/all", authenticate, getTopics);
router.get("/topics/user/:id", authenticate, getUserTopics);

module.exports = router;
