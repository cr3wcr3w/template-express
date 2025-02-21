import swaggerJsdoc from "swagger-jsdoc";
import { Options } from "swagger-jsdoc";

const options: Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Rest API Documentation",
      version: "v1",
    },
  },

  apis: ["src/v1/routes/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);
