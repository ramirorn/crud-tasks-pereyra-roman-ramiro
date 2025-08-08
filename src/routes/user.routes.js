import { Router } from "express";

const userRouter = Router();

userRouter.post("/users");
userRouter.get("/users");
userRouter.get("/users:id");
userRouter.put("/users:id");
userRouter.delete("/users:id");

export default userRouter;