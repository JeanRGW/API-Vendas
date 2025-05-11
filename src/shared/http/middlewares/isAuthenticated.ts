import auth from "@config/auth";
import AppError from "@shared/http/errors/AppError";
import { verify } from "jsonwebtoken";
import { NextFunction, Response, Request } from "express";

interface ITokenPayLoad {
    iat: number,
    exp: number,
    subject: string,
}

export default function isAuthenticated(req: Request, res: Response, next: NextFunction){
    const authHeader = req.headers.authorization
    if(!authHeader)
        throw new AppError("JWT Token is missing.", 400);

    const [type, token] = authHeader.split(" ")

    try {
        const decodeToken = verify(token, auth.jwt.secret)
        const {subject} = decodeToken as ITokenPayLoad
        req.user = {id: subject}
        console.log(decodeToken)

        return next();
    } catch (error) {
        throw new AppError("Invalid JWT Token", 401)
    }
}