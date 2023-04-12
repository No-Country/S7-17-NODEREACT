const { Router } = require("express");
const { getNewsByTopic } = require("../controllers");
const { authenticate } = require("../middlewares/auth.middleware");

const router = Router();

/**
 * @openapi
 * /api/v1/news/topic/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get an array of news by topic.
 *     tags: [News]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The Topic id
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

router.get("/news/topic/:id", getNewsByTopic);

module.exports = router;
