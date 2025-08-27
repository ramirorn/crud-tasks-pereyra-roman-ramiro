import { Router } from "express";
import {
  createNewUser,
  getUserById,
  updateUser,
  deleteUser,
  getAllUser,
} from "../controllers/user.controllers.js";
import {
  createNewUserValidation,
  getUserByIdValidation,
  deleteUserValidation,
  updateUserValidation,
} from "../middlewares/validations/user.validations.js";
import { aplicarValidaciones } from "../middlewares/validator.js";

const userRouter = Router();

userRouter.post(
  "/users",
  createNewUserValidation,
  createNewUser,
  aplicarValidaciones
);
userRouter.get("/users", getAllUser);
userRouter.get(
  "/users/:id",
  getUserById,
  aplicarValidaciones,
  getUserByIdValidation
);
userRouter.put(
  "/users/:id",
  updateUser,
  aplicarValidaciones,
  updateUserValidation
);
userRouter.delete(
  "/users/:id",
  deleteUser,
  aplicarValidaciones,
  deleteUserValidation
);

export default userRouter;
