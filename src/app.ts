import express, { Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import { userRoutes } from "./v1/routes";
import { swaggerSpec } from "./v1/config";
import { errorHandler, limiter, logger, speedLimiter } from "./shared/middlewares";

const port = process.env.DB_EXPRESS_PORT;

// Initialize Express app
const app = express();

// Global Middleware
app.use(express.json());
app.use(logger);
app.use(limiter);
app.use(speedLimiter);

// Entry Endpoint
app.get("/api/v1", (req: Request, res: Response) => {
  res.json({
    name: "Test API",
    version: "1.0.0",
    status: "running",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// v1 API Routes
app.use("/api/v1/users", userRoutes);
app.get('/api/v1/error-test', (req, res, next) => {
  next(new Error('Something went wrong!'));
});

// v1 Swagger Docs Middleware
app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Global Error Handling Middleware
app.use(errorHandler);

// Start Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
