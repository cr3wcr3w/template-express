import express, { Request, Response } from "express";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./v1/config/swagger-config";
import { logger, errorHandler } from "./v1/middlewares";

// Load environment variables
dotenv.config();
const port = process.env.DB_EXPRESS_PORT;

// Initialize Express app
const app = express();

// Global Middleware
app.use(express.json());
app.use(logger);

// Entry Endpoint
app.get("/", (req: Request, res: Response) => {
  res.json({
    name: "Test API",
    version: "1.0.0",
    status: "running",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// Define API Routes
// app.use()

// Swagger Docs Middleware
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Error Handling Middleware
app.use(errorHandler);

// Start Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
