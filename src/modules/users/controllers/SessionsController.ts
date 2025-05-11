import { NextFunction, Request, Response } from "express";
import CreateSessionService from "../services/CreateSessionService";

export default class SessionsController {
    public async create(req: Request, res: Response, next: NextFunction): Promise<Response | void>{
        try {
            const {email, password} = req.body
            const createSession = new CreateSessionService()
            const user = await createSession.execute({email, password})
            return res.json(user);
        } catch (err) {
            next(err)
        }
    }
}