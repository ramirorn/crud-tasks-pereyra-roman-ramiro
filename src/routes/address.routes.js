import { Router } from "express";
import {
  createNewAddress,
  getAllAddresses,
  getAddressById,
} from "../controllers/address.controllers.js";

const addressRouter = Router();

addressRouter.post("/address", createNewAddress);
addressRouter.get("/address", getAllAddresses);
addressRouter.get("/address/:id", getAddressById);

export default addressRouter;
