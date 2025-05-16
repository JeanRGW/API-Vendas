import { NextFunction, Request, Response } from "express";
import ListUsersService from "../services/ListUsersService";
import CreateUserService from "../services/CreateUserService";
import UsersRepository from "../typeorm/repositories/UsersRepository";

export default class UsersController {
    public async index(req: Request, res: Response, next: NextFunction): Promise<Response|void>{
        try {
            const listUser = new ListUsersService()
            const users = await listUser.execute()
            return res.json(users)
        } catch (err) {
            next(err)
        }
    }

    public async create(req: Request, res: Response, next: NextFunction): Promise<Response|void>{
        try {
            const {name, email, password} = req.body;

            const createUser = new CreateUserService();
            const user = await createUser.execute({name, email, password})

            return res.json(UsersRepository)
        } catch (err) {
            next(err)
        }
    }
}