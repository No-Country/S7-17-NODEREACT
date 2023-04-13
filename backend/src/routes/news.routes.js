const { Router } = require("express");
const { getNewsByUserTopics } = require("../controllers");
const { authenticate } = require("../middlewares/auth.middleware");

const router = Router();

/**
 * @openapi
 * /api/v1/news/topic/user/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get an array of news by topic and user ID.
 *     tags: [News]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The User id
 *     responses:
 *       200:
 *         description: The news were successfully found.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/News'
 */

router.get("/news/topic/user/:id", getNewsByUserTopics);

module.exports = router;
