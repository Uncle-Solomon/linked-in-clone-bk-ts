import express from "express";
import { validateUser } from "../../middlewares/validateUser";
import { getAllComments } from "../../controllers/post/comments/getAllComments";
import { getCommentById } from "../../controllers/post/comments/getCommentById";
import { getCommentByPostId } from "../../controllers/post/comments/getCommentByPostId";
import { createComment } from "../../controllers/post/comments/createComment";

export const commentRoute = express.Router();

/**
 * @swagger
 * /api/v1/comment/get-all-comments:
 *   get:
 *     summary: Get all comments
 *     tags: [Comments]
 *     parameters:
 *       - in: header
 *         name: AccessToken
 *         type: string
 *         required: false
 *         description: Access token required for authentication
 *       - in: header
 *         name: RefreshToken
 *         type: string
 *         required: false
 *         description: Refresh token required for authentication
 *     security:
 *       - AccessToken: []
 *       - RefreshToken: []
 *     responses:
 *       '200':
 *         description: Comments found successfully
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */
commentRoute.get("/get-all-comments", validateUser, getAllComments);

/**
 * @swagger
 * /api/v1/comment/get-comment/{id}:
 *   get:
 *     summary: Get comment by ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the comment to retrieve
 *         schema:
 *           type: string
 *       - in: header
 *         name: AccessToken
 *         type: string
 *         required: false
 *         description: Access token required for authentication
 *       - in: header
 *         name: RefreshToken
 *         type: string
 *         required: false
 *         description: Refresh token required for authentication
 *     security:
 *       - AccessToken: []
 *       - RefreshToken: []
 *     responses:
 *       '200':
 *         description: Comment found successfully
 *       '404':
 *         description: Comment does not exist
 *       '500':
 *         description: Internal server error
 */
commentRoute.get("/get-comment/:id", validateUser, getCommentById);

/**
 * @swagger
 * /api/v1/comment/get-comment-by-post/{post_id}:
 *   get:
 *     summary: Get comments by post ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: post_id
 *         required: true
 *         description: ID of the post whose comments to retrieve
 *         schema:
 *           type: string
 *       - in: header
 *         name: AccessToken
 *         type: string
 *         required: false
 *         description: Access token required for authentication
 *       - in: header
 *         name: RefreshToken
 *         type: string
 *         required: false
 *         description: Refresh token required for authentication
 *     security:
 *       - AccessToken: []
 *       - RefreshToken: []
 *     responses:
 *       '200':
 *         description: Comments found successfully
 *       '404':
 *         description: Comments for the post not found
 *       '500':
 *         description: Internal server error
 */
commentRoute.get(
  "/get-comment-by-post/:post_id",
  validateUser,
  getCommentByPostId
);

/**
 * @swagger
 * /api/v1/comment/create-comment:
 *   post:
 *     summary: Create a new comment
 *     tags: [Comments]
 *     parameters:
 *       - in: header
 *         name: AccessToken
 *         type: string
 *         required: false
 *         description: Access token required for authentication
 *       - in: header
 *         name: RefreshToken
 *         type: string
 *         required: false
 *         description: Refresh token required for authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *                 description: ID of the user who created the comment
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
 *       - AccessToken: []
 *       - RefreshToken: []
 *     responses:
 *       '201':
 *         description: Comment created successfully
 *       '500':
 *         description: Internal server error
 */
commentRoute.post("/create-comment", validateUser, createComment);
