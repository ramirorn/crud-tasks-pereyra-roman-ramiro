import { Router } from "express";
import {
  taskCategoryCreate,
  getAllTaskCategories,
  getTaskCategoryById,
} from "../controllers/task_categories.controllers.js";
import {
  taskCategoryCreateValidation,
  deleteTaskCategoryValidation,
  getTaskCategoryByIdValidation,
  updateTaskCategoryValidation,
} from "../middlewares/validations/task_categories.validations.js";
import { aplicarValidaciones } from "../middlewares/validator.js";

const taskCategoriesRouter = Router();

taskCategoriesRouter.post(
  "/tasktCategories",
  taskCategoryCreate,
  aplicarValidaciones,
  taskCategoryCreateValidation
);
taskCategoriesRouter.get("/tasktCategories", getAllTaskCategories);
taskCategoriesRouter.get(
  "/tasktCategories/:id",
  getTaskCategoryById,
  aplicarValidaciones,
  getTaskCategoryByIdValidation
);

export default taskCategoriesRouter;
