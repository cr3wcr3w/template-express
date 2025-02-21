import { Request, Response, NextFunction } from "express";
import { z } from "zod";

const userSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters"),
  })
  .strict();

export const validateUser = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const result = userSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json(result.error);
    return;
  }

  next();
};

const userIdSchema = z
  .object({
    id: z.coerce.number().int().positive("User ID must be a positive integer"),
  })
  .strict();

export const validateUserId = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const result = userIdSchema.safeParse(req.params);

  if (!result.success) {
    res
      .status(400)
      .json({ error: "Invalid user ID. Must be a positive integer." });
    return;
  }

  if (Object.keys(req.body).length > 0) {
    res.status(400).json({ error: "request should not have a body" });
    return;
  }

  next();
};
