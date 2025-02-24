import {auth} from "express-oauth2-jwt-bearer"
import { NextFunction, Request, Response } from "express";

const jwtCheck = auth({
    audience: process.env.AUTH0_AUDIENCE,
    issuerBaseURL: process.env.AUTH0_ISSUE_BASEURL,
    tokenSigningAlg: process.env.AUTH0_TOKEN_SIGNING_ALG
});

export const authorizationHandler = (req: Request, res: Response, next: NextFunction) => {
    jwtCheck(req, res, (err) => {
        if (err) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        next();
    });
};

