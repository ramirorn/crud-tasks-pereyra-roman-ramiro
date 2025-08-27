import { body, param } from "express-validator";
import { AddressModel } from "../../models/address.model.js";

// Validaciones para crear una nueva direccion
export const createNewAddressValidation = [
  body("street")
    .isEmpty()
    .withMessage("Debe especificar la calle")
    .trim()
    .isLength({ min: 5, max: 100 })
    .withMessage("La calle no debe superar los 100 caracteres"),
  body("street_number")
    .isEmpty()
    .withMessage("Debe especificar la altura de la calle")
    .trim()
    .isLength({ max: 4 })
    .withMessage("La altura de la calle no debe superar los 4 digitos"),
  body("neighborhood")
    .isEmpty()
    .withMessage("Debe especificar el barrio")
    .trim()
    .isLength({ min: 7, max: 100 })
    .withMessage("El barrio no debe superar los 100 caracteres"),
];

// Validaciones para borrar una direccion
export const deleteAddressValidation = [
  param("address_id")
    .notEmpty()
    .withMessage("Debe mandar un id para borrar un usuario")
    .isInt()
    .withMessage("El id debe ser un número entero"),
];

// Validaciones para traer una direccion por id
export const getAddressByIdValidation = [
  param("address_id")
    .notEmpty()
    .withMessage("Debe mandar un id para borrar un usuario")
    .isInt()
    .withMessage("El id debe ser un número entero"),
];

// Validaciones para actualizar una direccion
export const updateAddressValidation = [
  body("street")
    .optional()
    .isEmpty()
    .withMessage("Debe especificar la calle")
    .trim()
    .isLength({ min: 5, max: 100 })
    .withMessage("La calle no debe superar los 100 caracteres"),
  body("street_number")
    .optional()
    .isEmpty()
    .withMessage("Debe especificar la altura de la calle")
    .trim()
    .isLength({ max: 4 })
    .withMessage("La altura de la calle no debe superar los 4 digitos"),
  body("neighborhood")
    .optional()
    .isEmpty()
    .withMessage("Debe especificar el barrio")
    .trim()
    .isLength({ min: 7, max: 100 })
    .withMessage("El barrio no debe superar los 100 caracteres"),
];
