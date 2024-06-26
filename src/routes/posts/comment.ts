import express from "express";
import { validateUser } from "../../middlewares/validateUser";
import { getAllComments } from "../../controllers/post/comments/getAllComments";
import { getCommentById } from "../../controllers/post/comments/getCommentById";
import { getCommentByPostId } from "../../controllers/post/comments/getCommentByPostId";
import { createComment } from "../../controllers/post/comments/createComment";

export const commentRoute = express.Router();

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
 * /api/v1/comment:
 *   get:
 *     summary: Get all comments
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Comments found successfully
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 *   post:
 *     summary: Create a new comment
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               post:
 *                 type: string
 *                 description: ID of the post to which the comment belongs
 *               textBody:
 *                 type: string
 *                 description: The main body text of the comment
 *               imgUrl:
 *                 type: string
 *                 description: URL of the image attached to the comment
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '201':
 *         description: Comment created successfully
 *       '500':
 *         description: Internal server error

 */
commentRoute
  .route("/")
  .get(validateUser, getAllComments)
  .post(validateUser, createComment);

/**
 * @swagger
 * /api/v1/comment/{id}:
 *   get:
 *     summary: Get comment by ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the comment to retrieve
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Comment found successfully
 *       '404':
 *         description: Comment does not exist
 *       '500':
 *         description: Internal server error
 */
commentRoute.get("/:id", validateUser, getCommentById);

/**
 * @swagger
 * /api/v1/comment/post/{post_id}:
 *   get:
 *     summary: Get comments by post ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: post_id
 *         required: true
 *         description: ID of the post whose comments to retrieve
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Comments found successfully
 *       '404':
 *         description: Comments for the post not found
 *       '500':
 *         description: Internal server error
 */
commentRoute.get("/post/:post_id", validateUser, getCommentByPostId);
