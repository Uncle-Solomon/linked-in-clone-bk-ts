import swaggerJSDoc from "swagger-jsdoc";
import path from "path";

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
  },

  apis: [path.resolve(__dirname, "./routes/*.ts")],
};
export const swaggerSpec = swaggerJSDoc(options);
