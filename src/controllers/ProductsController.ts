import { Request, Response } from "express";
import { Product } from "models/Product";
import { getRepository } from "typeorm";

/**
 * GET - Buscar uma infomação dentro do servidor
 * POST - Inserir uma infomação no servidor
 * PUT - Alterar uma infomação no servidor
 * PATCH - Alterar uma infomação no servidor
 * DELETE - Deletar uma informação no servidor
 */

/**
 *
 * Tipos de parâmetros
 *
 * Route Params => Identificar um recurso editar/deletar/buscar
 * Query Params => Paginação / Filtro
 * Body Params => Os objetos inserção/alteração (JSON)
 *
 */

/*
 * Funções Controller
 *
 * Index => Listagem
 * Show => Detalhe
 * Delete => Deletar
 * Update => Atualizar
 * Create => Cadastrar
 */

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
