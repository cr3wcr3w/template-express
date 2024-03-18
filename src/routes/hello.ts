import express from "express";

export const helloRouter = express.Router();

helloRouter.get('/', (_req: any, res: { send: (arg0: string) => void }) => {
    res.send('Hello World!')
})