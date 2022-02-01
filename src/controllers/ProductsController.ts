import { Request, Response } from "express";
import { Product } from "models/Product";
import { getRepository } from "typeorm";

class ProductsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const productsRepository = getRepository(Product);

    const products = await productsRepository.find();

    return response.status(200).json(products);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const productsRepository = getRepository(Product);

    const product = await productsRepository.findOne({
      where: { id },
    });

    return response.status(200).json(product);
  }
}

export { ProductsController };
