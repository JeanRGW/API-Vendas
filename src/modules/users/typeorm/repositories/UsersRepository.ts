import { EntityRepository, Repository } from "typeorm";
import User from "../entities/User";

@EntityRepository(User)
export default class UsersRepository extends Repository<User> {

    async findByName(name: string): Promise<User | undefined> {
        return this.findOne({ where: { name } });
    }

    async findById(id: string): Promise<User | undefined> {
        return this.findOne({ where: { id } });
    }

    async findByEmail(email: string): Promise<User | undefined> {
        return this.findOne({ where: { email } });
    }

}