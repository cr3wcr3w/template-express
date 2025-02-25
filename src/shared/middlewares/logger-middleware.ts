import { Request, Response, NextFunction } from "express";

/**
 * Extends the Express Request object to include a timestamp property.
 */
interface CustomRequest extends Request {
  timestamp?: string;
}

/**
 * Middleware function to log HTTP requests.
 *
 * This middleware adds a timestamp to the request object and logs request details,
 * including the HTTP method, client IP, requested URL, and User-Agent.
 *
 * @param {CustomRequest} req - The incoming request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - Function to pass control to the next middleware.
 */
export function logger(req: CustomRequest, res: Response, next: NextFunction) {
  req.timestamp = new Date().toISOString();
  const userAgent = req.get("User-Agent") || "Unknown User-Agent";

  console.log(
    `${req.timestamp} ${req.method} ${req.ip} ${req.originalUrl} - ${userAgent}`,
  );

  next();
}
