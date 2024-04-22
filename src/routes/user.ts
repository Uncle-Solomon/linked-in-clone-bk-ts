import express from "express";

import { getAllUsers } from "../controllers/user/getAllUsers";
import { getUserById } from "../controllers/user/getUserById";
import { updateUser } from "../controllers/user/updateUser";
import { validateUser } from "../middlewares/validateUser";

export const userRoute = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *      user-update:
 *          type: object
 *          properties:
 *              otherNames:
 *                  type: string
 *                  description: The updated first name of the user
 *              lastName:
 *                  type: string
 *                  description: The updated last name of the user
 *          example:
 *              otherNames: John
 *              lastName: Doe
 *   securitySchemes:
 *      bearerAuth:            # arbitrary name for the security scheme
 *        type: http
 *        scheme: bearer
 *        bearerFormat: JWT    # optional, arbitrary value for documentation purpose
 */

/**
 * @swagger
 * /api/v1/user:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Users found successfully
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 * securityDefinitions:
 *   Authorization:
 *     type: apiKey
 *     name: Authorization
 *     in: header
 *     description: Bearer token required for authentication
 */
userRoute.get("/", validateUser, getAllUsers);

/**
 * @swagger
 * /api/v1/user/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: User found successfully
 *       '404':
 *         description: User does not exist
 *       '500':
 *         description: Internal server error
 *
 *   patch:
 *     summary: Update user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/user-update'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: User updated successfully
 *       '404':
 *         description: User does not exist
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 *
 */

userRoute
  .route("/:id")
  .get(validateUser, getUserById)
  .patch(validateUser, updateUser);
