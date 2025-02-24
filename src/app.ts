import express, { Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import { authorizationHandler, errorHandler, limiter, logger, speedLimiter } from "./v1/middlewares";
import { userRoutes } from "./v1/routes";
import { swaggerSpec } from "./v1/config";

const port = process.env.DB_EXPRESS_PORT;

// Initialize Express app
const app = express();

// Global Middleware
app.use(express.json());
app.use(logger);

// Entry Endpoint
app.get("/api/v1", authorizationHandler, (req: Request, res: Response) => {
  res.json({
    name: "Test API",
    version: "1.0.0",
    status: "running",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// Rate Limit Middleware to /api/*
app.use("/api/v1", limiter);
app.use("/api/v1", speedLimiter);

// Define API Routes
// app.use()
app.use("/api/v1/users", userRoutes);

// Swagger Docs Middleware
app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Error Handling Middleware
app.use(errorHandler);

// Start Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
