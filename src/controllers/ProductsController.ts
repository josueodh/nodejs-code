import { Request, Response } from "express";
import { Product } from "../models/Product";
import { getRepository } from "typeorm";
import slugify from "slugify";

class ProductsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const productsRepository = getRepository(Product);

    const products = await productsRepository.find({
      relations: ["category"],
    });

    return response.status(200).json(products);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, cover, value, category_id, description } = request.body;

    const slug = slugify(name, "-");

    const productsRepository = getRepository(Product);

    const findProduct = await productsRepository.findOne({
      where: {
        name,
      },
    });

    if (findProduct) {
      throw new Error("Product already exists");
    }

    const product = productsRepository.create({
      name,
      slug,
      value,
      category_id,
      description,
      cover,
    });

    await productsRepository.save(product);

    return response.status(201).json(product);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const productsRepository = getRepository(Product);

    const product = await productsRepository.findOne({
      where: { id },
    });

    if (!product) {
      throw new Error("Product not found");
    }

    return response.status(200).json(product);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const { name, cover, value, category_id, description } = request.body;

    const slug = slugify(name, "-");

    const productsRepository = getRepository(Product);

    const findProductByName = await productsRepository.findOne({
      where: {
        name,
      },
    });

    if (findProductByName && findProductByName.id !== id) {
      throw new Error("Product already exists");
    }

    const product = await productsRepository.findOne({
      where: { id },
    });

    if (!product) {
      throw new Error("Product not found");
    }

    const updateProduct = productsRepository.merge(product, {
      name,
      slug,
      value,
      category_id,
      description,
      cover,
    });

    await productsRepository.save(updateProduct);

    return response.status(201).json(updateProduct);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const productsRepository = getRepository(Product);

    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new Error("Product not found");
    }
    await productsRepository.remove(product);

    return response.status(200).json();
  }
}

export { ProductsController };
