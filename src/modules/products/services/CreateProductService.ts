import { getCustomRepository } from "typeorm";
import Product from "../typeorm/entities/Product";
import ProductRepository from "../typeorm/repositories/ProductsRepository";
import AppError from "@shared/http/errors/AppError";

interface IRequest {
    name: string;
    price: number;
    quantity: number;
}

export default class CreateProductService {
    public async execute ({name, price, quantity}: IRequest): Promise<Product> {
        const productsRepository = getCustomRepository(ProductRepository)

        const productExists = await productsRepository.findByName(name);

        if(productExists)
            throw new AppError("There is already one product with this name.");

        const newProduct = productsRepository.create({name, price, quantity});
        await productsRepository.save(newProduct);
        return newProduct;
    }
}