import { Request, Response } from "express";

/**
 * Get all users.
 * @param req - Express request object
 * @param res - Express response object
 */
export const getUsers = (req: Request, res: Response): void => {
  res.send({ message: "All users fetched!" });
};

/**
 * Get a single user by ID.
 * @param req - Express request object
 * @param res - Express response object
 */
export const getUserById = (req: Request, res: Response): void => {
  const userId: string = req.params.id;
  res.send({ message: `User ${userId} fetched!` });
};

/**
 * Create a new user.
 * @param req - Express request object
 * @param res - Express response object
 */
export const createUser = (req: Request, res: Response): void => {
  const userData: { name?: string } = req.body; // Define expected shape of request body
  res.send({ message: "User created!", data: userData });
};

/**
 * Delete a user by ID.
 * @param req - Express request object
 * @param res - Express response object
 */
export const deleteUser = (req: Request, res: Response): void => {
  const userId: string = req.params.id;
  res.send({ message: `User ${userId} deleted!` });
};
