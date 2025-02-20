import { NextFunction, Request, Response } from "express";
import fs from "fs";
import path from "path";

const API_VERSION = "v1"; // Change this based on your API version

/**
 * Global error handling middleware for Express.
 * Logs errors to a file and returns a standardized JSON response.
 */
export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) {
  const timestamp = new Date().toISOString();
  const userAgent = req.get("User-Agent") || "Unknown User-Agent";
  const ip = req.ip || "Unknown IP";

  const logMessage = `[${timestamp}] ERROR: ${err.message}
Method: ${req.method} | URL: ${req.originalUrl} | IP: ${ip} | User-Agent: ${userAgent}\n\n`;

  console.error(logMessage);

  const now = new Date();
  const formattedDate = `${now.getMonth() + 1}-${now.getDate()}-${now.getFullYear()}`; // MM-DD-YYYY
  const logFileName = `${formattedDate}-${API_VERSION}.log`;

  const logDir = path.join(__dirname, "../../../logs"); // Directory
  const logFilePath = path.join(logDir, logFileName); // Dynamic file name

  try {
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }

    fs.appendFileSync(logFilePath, logMessage);
  } catch (fsErr) {
    console.error("Failed to write to log file:", fsErr);
  }

  res.status(500).json({
    message: "Internal Server Error",
  });
}

// app.get('/api/v1/error-test', (req, res, next) => {
//   next(new Error('Something went wrong!'));
// });
