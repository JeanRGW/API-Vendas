import { getCustomRepository } from "typeorm";
import UserTokensRepository from "../typeorm/repositories/UserTokensRepository";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import AppError from "@shared/http/errors/AppError";
import EtherealMail from "@config/mail/EtherealMail";

interface IRequest {
    email: string;

}

export default class SendForgotPasswordEmailService {
    public async execute({email}: IRequest): Promise<void> {
        const userRepository = getCustomRepository(UsersRepository);
        const userTokensRepository = getCustomRepository(UserTokensRepository);

        const user = await userRepository.findByEmail(email);
        if(!user) {
            throw new AppError('User does not exist');
        }

        const {token} = await userTokensRepository.generate(user.id);
        console.log(token);
        await EtherealMail.sendMail({
            to: email,
            body: `Solicitação de redefinição de senha recebida: ${token}`
        })
    }
}