import { Router } from "express";

const taskRouter = Router();

taskRouter.post("/tasks");
taskRouter.get("/tasks");
taskRouter.get("/tasks:id");
taskRouter.put("/tasks:id");
taskRouter.delete("/tasks:id");

export default taskRouter;