import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Category } from "../models/Category";

class CategoriesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const categoriesRepository = getRepository(Category);

    const categories = await categoriesRepository.find();

    return response.status(200).json(categories);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const categoriesRepository = getRepository(Category);

    const category = await categoriesRepository.findOne(id);

    if (!category) {
      throw new Error("Category not found");
    }
    return response.status(200).json(category);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const categoriesRepository = getRepository(Category);

    const findCategory = await categoriesRepository.findOne({
      where: {
        name,
      },
    });

    if (findCategory) {
      throw new Error("Category already exists");
    }

    const category = categoriesRepository.create({
      name,
    });

    await categoriesRepository.save(category);

    return response.status(201).json(category);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const { name } = request.body;

    const categoriesRepository = getRepository(Category);

    const findCategoryByName = await categoriesRepository.findOne({
      where: {
        name,
      },
    });

    if (findCategoryByName && findCategoryByName.id !== id) {
      throw new Error("Category already exists");
    }

    const category = await categoriesRepository.findOne({
      where: { id },
    });

    if (!category) {
      throw new Error("Category not found");
    }
    const updateCategory = categoriesRepository.merge(category, {
      name,
    });

    await categoriesRepository.save(updateCategory);

    return response.status(201).json(updateCategory);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const categoriesRepository = getRepository(Category);

    const category = await categoriesRepository.findOne(id);

    if (!category) {
      throw new Error("Category not found");
    }
    await categoriesRepository.remove(category);

    return response.status(200).json();
  }
}

export { CategoriesController };
