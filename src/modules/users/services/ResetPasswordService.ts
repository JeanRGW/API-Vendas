import { getCustomRepository } from "typeorm";
import UserTokensRepository from "../typeorm/repositories/UserTokensRepository";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import AppError from "@shared/http/errors/AppError";
import { addHours, isAfter } from "date-fns";
import { hash } from "bcryptjs";

interface IRequest {
    token: string;
    password: string;
}

export default class ResetPasswordService {
    public async execute({token, password}: IRequest): Promise<void> {
        const userTokensRepository = getCustomRepository(UserTokensRepository);
        const userRepository = getCustomRepository(UsersRepository);

        const userToken = await userTokensRepository.findByToken(token);
        if(!userToken) {
            throw new AppError('User token does not exist');
        }

        const user = await userRepository.findById(userToken.user_id);
        if(!user) {
            throw new AppError('User does not exist');
        }

        const tokenCreatedAt = userToken.created_at;
        const compareDate = addHours(tokenCreatedAt, 2);
        if(isAfter(new Date(), compareDate)) {
            throw new AppError('Token expired');
        }

        user.password = await hash(password, 8)

        await userRepository.save(user);
    }
}