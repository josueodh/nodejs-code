import { Router } from "express";
import { categoriesRouter } from "./categories.routes";
import { productsRouter } from "./products.routes";

const routes = Router();

routes.use("/products", productsRouter);
routes.use("/categories", categoriesRouter);

export { routes };
