import { Router } from "express";
import { createNewTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask
} from "../controllers/task.controllers.js";

const taskRouter = Router();

taskRouter.post("/tasks", createNewTask);
taskRouter.get("/tasks", getAllTasks);
taskRouter.get("/tasks/:id", getTaskById);
taskRouter.put("/tasks/:id", updateTask);
taskRouter.delete("/tasks/:id", deleteTask);

export default taskRouter;