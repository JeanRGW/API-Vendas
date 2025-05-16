import { EntityRepository, Repository } from "typeorm";
import UserTokens from "../entities/UserTokens";

@EntityRepository(UserTokens)
export default class UsersRepository extends Repository<UserTokens> {
    async findByToken(token: string): Promise<UserTokens | undefined> {
        return await this.findOne({ where: { token } });
    }

    async generate(user_id: string): Promise<UserTokens> {
        const userToken = await this.create({
            user_id,
        });

        await this.save(userToken);

        return userToken;
    }
}