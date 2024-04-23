import express from "express";
import { validateUser } from "../../middlewares/validateUser";
import { getAllReplies } from "../../controllers/post/replies/getAllReplies";
import { getReplyById } from "../../controllers/post/replies/getReplyById";
import { getReplyByCommentId } from "../../controllers/post/replies/getReplyByCommentId";
import { createReply } from "../../controllers/post/replies/createReply";

export const replyRoute = express.Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *      bearerAuth:            # arbitrary name for the security scheme
 *        type: http
 *        scheme: bearer
 *        bearerFormat: JWT    # optional, arbitrary value for documentation purpose
 */

/**
 * @swagger
 * /api/v1/reply:
 *   get:
 *     summary: Get all replies
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Replies found successfully
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 *   post:
 *     summary: Create a new reply
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment:
 *                 type: string
 *                 description: ID of the comment to which the reply belongs
 *               textBody:
 *                 type: string
 *                 description: The main body text of the reply
 *               imgUrl:
 *                 type: string
 *                 description: URL of the image attached to the reply
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '201':
 *         description: Reply created successfully
 *       '500':
 *         description: Internal server error
 */
replyRoute
  .route("/")
  .get(validateUser, getAllReplies)
  .post(validateUser, createReply);

/**
 * @swagger
 * /api/v1/{id}:
 *   get:
 *     summary: Get reply by ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the reply to retrieve
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Reply found successfully
 *       '404':
 *         description: Reply does not exist
 *       '500':
 *         description: Internal server error
 */
replyRoute.get("/:id", validateUser, getReplyById);

/**
 * @swagger
 * /api/v1/reply/comment/{comment_id}:
 *   get:
 *     summary: Get replies by comment ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: comment_id
 *         required: true
 *         description: ID of the comment whose replies to retrieve
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Replies found successfully
 *       '404':
 *         description: Replies for the comment not found
 *       '500':
 *         description: Internal server error
 */
replyRoute.get("/comment/:comment_id", validateUser, getReplyByCommentId);
