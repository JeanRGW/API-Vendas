import auth from "@config/auth";
import AppError from "@shared/http/errors/AppError";
import { verify } from "jsonwebtoken";
import { NextFunction, Response, Request } from "express";

interface ITokenPayLoad {
    iat: number,
    exp: number,
    sub: string,
}

export default function isAuthenticated(req: Request, res: Response, next: NextFunction){
    const authHeader = req.headers.authorization
    if(!authHeader)
        throw new AppError("JWT Token is missing.", 400);

    const [type, token] = authHeader.split(" ")

    try {
        const decodeToken = verify(token, auth.jwt.secret)
        const {sub} = decodeToken as ITokenPayLoad
        req.user = {id: sub}
        return next();
    } catch (error) {
        throw new AppError("Invalid JWT Token", 401)
    }
}