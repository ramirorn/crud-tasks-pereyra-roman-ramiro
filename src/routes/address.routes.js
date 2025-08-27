import { Router } from "express";
import {
  createNewAddress,
  getAllAddresses,
  getAddressById,
} from "../controllers/address.controllers.js";

import { validationResult } from "express-validator";
import {
  createNewAddressValidation,
  deleteAddressValidation,
  getAddressByIdValidation,
  updateAddressValidation,
} from "../middlewares/validations/address.validations.js";
import { aplicarValidaciones } from "../middlewares/validator.js";

const addressRouter = Router();

addressRouter.post(
  "/address",
  createNewAddress,
  aplicarValidaciones,
  createNewAddressValidation
);
addressRouter.get("/address", getAllAddresses);
addressRouter.get(
  "/address/:id",
  getAddressById,
  aplicarValidaciones,
  getAddressByIdValidation
);

export default addressRouter;
