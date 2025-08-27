import { body, param } from "express-validator";
import { CategoriesModel } from "../../models/categories.model.js";

export const createNewCategoryValidation = [
  body("is_urgent")
    .isBoolean()
    .withMessage("'is_urgent' debe tener valor booleano: true o false"),
  body("is_group")
    .isBoolean()
    .withMessage("'is_group' debe tener valor booleano: true o false"),
];

export const deleteCategoryValidation = [
  param("category_id")
    .notEmpty()
    .withMessage("Debe mandar un id para borrar un usuario")
    .isInt()
    .withMessage("El id debe ser un número entero"),
];

export const getCategoryByIdValidation = [
  param("category_id")
    .notEmpty()
    .withMessage("Debe mandar un id para borrar un usuario")
    .isInt()
    .withMessage("El id debe ser un número entero"),
];

export const updateCategoryValidation = [
  body("is_urgent")
    .optional()
    .isBoolean()
    .withMessage("'is_urgent' debe tener valor booleano: true o false"),
  body("is_group")
    .optional()
    .isBoolean()
    .withMessage("'is_group' debe tener valor booleano: true o false"),
];
