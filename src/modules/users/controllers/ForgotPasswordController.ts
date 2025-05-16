import { NextFunction, Request, Response } from "express";
import SendForgotPasswordEmailService from "../services/SendForgotPasswordEmailService";

export default class ExportForgotPasswordController {

    public async create(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const {email} = req.body;
            const sendForgotPasswordEmailService = new SendForgotPasswordEmailService();
            await sendForgotPasswordEmailService.execute({email});
            return res.status(204).json();
        } catch (e) {
            next(e);
        }
    }
}