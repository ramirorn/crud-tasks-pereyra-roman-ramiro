import { Router } from "express";
import {
    taskCategoryCreate,
    getAllTaskCategories,
    getTaskCategoryById
} from "../controllers/task_categories.controllers.js";

const taskCategoriesRouter = Router();

taskCategoriesRouter.post("/tasktCategories", taskCategoryCreate);
taskCategoriesRouter.get("/tasktCategories", getAllTaskCategories);
taskCategoriesRouter.get("/tasktCategories", getTaskCategoryById);

export default taskCategoriesRouter;