import { Router } from "express";
import {
  createNewTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "../controllers/task.controllers.js";

import {
  createNewTaskValidation,
  deleteTaskValidation,
  updateTaskValidation,
  getTaskByIdValidation,
} from "../middlewares/validations/task.validations.js";
import { aplicarValidaciones } from "../middlewares/validator.js";

const taskRouter = Router();

taskRouter.post(
  "/tasks",
  createNewTask,
  aplicarValidaciones,
  createNewTaskValidation
);
taskRouter.get("/tasks", getAllTasks);
taskRouter.get(
  "/tasks/:id",
  getTaskById,
  aplicarValidaciones,
  getTaskByIdValidation
);
taskRouter.put(
  "/tasks/:id",
  updateTask,
  aplicarValidaciones,
  updateTaskValidation
);
taskRouter.delete(
  "/tasks/:id",
  deleteTask,
  aplicarValidaciones,
  deleteTaskValidation
);

export default taskRouter;
