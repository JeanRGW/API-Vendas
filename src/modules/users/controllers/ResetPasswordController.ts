import { NextFunction, Request, Response } from "express";
import ResetPasswordService from "../services/ResetPasswordService";

export default class ResetPasswordController {
	public async create(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const {token, password} = req.body;
            const resetPasswordService = new ResetPasswordService();
            await resetPasswordService.execute({token, password});
            return res.status(204).json();
        } catch (err) {
            next(err);
        }
    }
}
