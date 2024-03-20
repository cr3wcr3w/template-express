import express from "express";

export const helloRouter = express.Router();

/**
 * @openapi
 * /hello:
 *   get:
 *     description: Return a hello world message
 *     responses:
 *       200:
 *         description: Returns a string.
 */
helloRouter.get('/hello', (_req: any, res: { send: (arg0: string) => void }) => {
    res.send('Hello World!')
})