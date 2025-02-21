import { rateLimit } from "express-rate-limit"
import { slowDown } from "express-slow-down"

// Users making ≤ 50 requests in 5 minutes experience no slowdown or blocking.

// Users exceeding 100 requests in 5 minutes will be blocked until the window resets.
export const limiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    limit: 100,
});

// Users making 51–99 requests in 5 minutes will experience a 2-second delay per request.
export const speedLimiter = slowDown({
    windowMs: 5 * 60 * 1000,
    delayAfter: 50, 
    delayMs: () => 2000, // Delay each request by 2 seconds
});
