import { Router } from "express";
import {
    createNewUser,
    getUserById,
    updateUser,
    deleteUser
} from "../controllers/user.controllers.js";

const userRouter = Router();

userRouter.post("/users", createNewUser);
// userRouter.get("/users", getAllUsers);
userRouter.get("/users/:id", getUserById);
userRouter.put("/users/:id", updateUser);
userRouter.delete("/users/:id", deleteUser);

export default userRouter;