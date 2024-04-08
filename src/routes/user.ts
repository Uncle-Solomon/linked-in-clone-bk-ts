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
 */

/**
 * @swagger
 * /api/v1/get-all-users:
 *   get:
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
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - AccessToken: []
 *       - RefreshToken: []
 *     responses:
 *       '200':
 *         description: Users found successfully
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 * securityDefinitions:
 *   AccessToken:
 *     type: apiKey
 *     name: AccessToken
 *     in: header
 *     description: Access token required for authentication
 *   RefreshToken:
 *     type: apiKey
 *     name: RefreshToken
 *     in: header
 *     description: Refresh token required for authentication

 */
userRoute.get("/get-all-users", validateUser, getAllUsers);

/**
 * @swagger
 * /api/v1/get-user/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to retrieve
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
 *         description: User found successfully
 *       '404':
 *         description: User does not exist
 *       '500':
 *         description: Internal server error
 * securityDefinitions:
 *   AccessToken:
 *     type: apiKey
 *     name: AccessToken
 *     in: header
 *     description: Access token required for authentication
 *   RefreshToken:
 *     type: apiKey
 *     name: RefreshToken
 *     in: header
 *     description: Refresh token required for authentication

 */
userRoute.get("/get-user/:id", validateUser, getUserById);

/**
 * @swagger
 * /api/v1/edit-user/{id}:
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
 *       - AccessToken: []
 *       - RefreshToken: []
 *     responses:
 *       '200':
 *         description: User updated successfully
 *       '404':
 *         description: User does not exist
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 * securityDefinitions:
 *   AccessToken:
 *     type: apiKey
 *     name: AccessToken
 *     in: header
 *     description: Access token required for authentication
 *   RefreshToken:
 *     type: apiKey
 *     name: RefreshToken
 *     in: header
 *     description: Refresh token required for authentication
 */

userRoute.patch("/edit-user/:id", validateUser, updateUser);
