import { Router } from "express";
import {
  createNewCategory,
  getAllCategories,
  getCategoryById,
} from "../controllers/categories.controllers.js";
import {
  createNewCategoryValidation,
  getCategoryByIdValidation,
  deleteCategoryValidation,
  updateCategoryValidation,
} from "../middlewares/validations/categories.validations.js";
import { aplicarValidaciones } from "../middlewares/validator.js";

const categoriesRouter = Router();

categoriesRouter.post(
  "/categories",
  createNewCategory,
  aplicarValidaciones,
  createNewCategoryValidation
);
categoriesRouter.get("/categories", getAllCategories);
categoriesRouter.get(
  "/categories/:id",
  getCategoryById,
  aplicarValidaciones,
  getCategoryByIdValidation
);

export default categoriesRouter;
