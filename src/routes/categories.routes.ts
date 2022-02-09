import { Router } from "express";
import { CategoriesController } from "../controllers/CategoriesController";

const categoriesRouter = Router();
const categoriesController = new CategoriesController();

categoriesRouter.post("/", categoriesController.create);
categoriesRouter.get("/", categoriesController.index);
categoriesRouter.get("/:id", categoriesController.show);
categoriesRouter.put("/:id", categoriesController.update);
categoriesRouter.delete("/:id", categoriesController.delete);

export { categoriesRouter };
