import swaggerJSDoc from "swagger-jsdoc";
import path from "path";
import { PORT } from "./utils/config";

// Swagger configuration options
const options: swaggerJSDoc.Options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Linked-in Clone API Documentation",
      version: "1.0.0",
      description:
        "The API documentation for Linked-in Clone, developed by Ameh Solomon Onyeke (A.S.O)",
    },
    servers: [
      {
        url: process.env.BASE_URL || `http://localhost:${PORT}`,
      },
    ],
  },

  apis: [path.resolve(__dirname, "./routes/**/*.ts")],
};
export const swaggerSpec = swaggerJSDoc(options);
