import { ProductsController } from "../controllers/ProductsController";
import { Router } from "express";

const productsRouter = Router();
const productsController = new ProductsController();

productsRouter.get("/", productsController.index);
productsRouter.get("/:id", productsController.show);
productsRouter.post("/", productsController.create);
productsRouter.put("/:id", productsController.update);
productsRouter.delete("/:id", productsController.delete);

export { productsRouter };
