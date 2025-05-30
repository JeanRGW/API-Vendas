import { EntityRepository, Repository } from "typeorm";
import Product from "../entities/Product";

@EntityRepository(Product)
export default class ProductsRepository extends Repository<Product> {

    async findByName(name: string): Promise<Product | undefined> {
        return this.findOne({ where: { name } });
    }

}