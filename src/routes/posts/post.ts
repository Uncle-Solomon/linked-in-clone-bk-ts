import express from "express";

import { validateUser } from "../../middlewares/validateUser";
import { getAllPosts } from "../../controllers/post/posts/getAllPosts";
import { getPostById } from "../../controllers/post/posts/getPostById";
import { getPostByUserId } from "../../controllers/post/posts/getPostByUserId";
import { createPost } from "../../controllers/post/posts/createPost";

export const postRoute = express.Router();

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
 * /api/v1/post:
 *   get:
 *     summary: Get all posts
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Posts found successfully
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               textHead:
 *                 type: string
 *                 description: The heading text of the post
 *               textBody:
 *                 type: string
 *                 description: The main body text of the post
 *               imgUrl:
 *                 type: string
 *                 description: URL of the image attached to the post
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '201':
 *         description: Post created successfully
 *       '500':
 *         description: Internal server error
 */
postRoute
  .route("/")
  .get(validateUser, getAllPosts)
  .post(validateUser, createPost);

/**
 * @swagger
 * /api/v1/post/{id}:
 *   get:
 *     summary: Get post by ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the post to retrieve
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Post found successfully
 *       '404':
 *         description: Post does not exist
 *       '500':
 *         description: Internal server error
 */
postRoute.get("/:id", validateUser, getPostById);

/**
 * @swagger
 * /api/v1/post/user/{id}:
 *   get:
 *     summary: Get all posts by user ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user's post to retrieve
 *         schema:
 *           type: string
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Posts found successfully
 *       '404':
 *         description: Posts for the user not found
 *       '500':
 *         description: Internal server error
 */
postRoute.get("/user/:id", validateUser, getPostByUserId);
