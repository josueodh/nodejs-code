import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Category } from "../models/Category";

class CategoriesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const categoriesRepository = getRepository(Category);

    const category = categoriesRepository.create({
      name,
    });

    await categoriesRepository.save(category);

    return response.status(201).json(category);
  }
}

export { CategoriesController };
