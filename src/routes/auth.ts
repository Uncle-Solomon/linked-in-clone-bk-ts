import express from "express";

import { signup } from "../controllers/auth/signup";
import { login } from "../controllers/auth/login";
import { forgotPassword } from "../controllers/auth/forgotPassword";

export const authRoute = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     signup:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           format: password
 *         lastName:
 *           type: string
 *         otherNames:
 *           type: string
 *       required:
 *         - email
 *         - password
 *         - lastName
 *         - otherNames
 *     login:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           format: password
 *       required:
 *         - email
 *         - password
 *     forgot-password:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           format: password
 *         confirmPassword:
 *           type: string
 *       required:
 *         - username
 *         - password
 *         - confirmPassword
 */

/**
 * @swagger
 * /api/v1/signup:
 *   post:
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/signup'
 *     responses:
 *       '201':
 *         description: User created successfully
 *       '400':
 *         description: Bad request
 *       '422':
 *         description: Unprocessable entity
 *       '500':
 *         description: Internal server error
 */
authRoute.post("/signup", signup);

/**
 * @swagger
 * /api/v1/login:
 *   post:
 *     summary: Login user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/login'
 *     responses:
 *       '200':
 *         description: User login successful
 *       '404':
 *         description: User does not exist
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */
authRoute.post("/login", login);

/**
 * @swagger
 * /api/v1/forgot-password:
 *   post:
 *     summary: Change user's forgotten password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/forgot-password'
 *     responses:
 *       '200':
 *         description: User password changed successfully
 *       '404':
 *         description: User does not exist
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */
authRoute.post("/forgot-password", forgotPassword);
