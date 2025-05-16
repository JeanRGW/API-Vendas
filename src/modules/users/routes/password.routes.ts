import { Router } from "express";
import ExportForgotPasswordController from "../controllers/ForgotPasswordController";
import { celebrate, Joi, Segments } from "celebrate";
import ResetPasswordController from "../controllers/ResetPasswordController";

const passwordRouter = Router();
const forgotPasswordController = new ExportForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordRouter.post(
	"/forgot",
	celebrate({
		[Segments.BODY]: {
			email: Joi.string().email().required(),
		},
	}),
	async (req, res, next) => {
		try {
			forgotPasswordController.create(req, res, next);
		} catch (e) {
			next(e);
		}
	}
);

passwordRouter.post(
	"/reset",
	celebrate({
		[Segments.BODY]: {
			token: Joi.string().uuid().required(),
			password: Joi.string().required(),
			password_confirmation: Joi.string().required().valid(Joi.ref("password")),
		},
	}),
	async (req, res, next) => {
		resetPasswordController.create(req, res, next);
	}
);

export default passwordRouter;
