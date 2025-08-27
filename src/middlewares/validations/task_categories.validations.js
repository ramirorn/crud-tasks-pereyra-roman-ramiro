import { body, param } from "express-validator";
import { TaskCategoriesModel } from "../../models/task_categories.model.js";

// Validaciones para crear una relacion entre task y category
export const taskCategoryCreateValidation = [
  body("task_id")
    .isEmpty()
    .withMessage("'task_id' no debe estar vacio")
    .isInt()
    .withMessage("El task_id debe ser un entero"),
  body("category_id")
    .isEmpty()
    .withMessage("'task_id' no debe estar vacio")
    .isInt()
    .withMessage("El category_id debe ser un entero"),
];

// Validaciones para borrar una relacion entre task y category
export const deleteTaskCategoryValidation = [
  param("id")
    .notEmpty()
    .withMessage("Debe mandar un id para borrar un usuario")
    .isInt()
    .withMessage("El id debe ser un número entero"),
];

// Validaciones para traer una relacion entre task y category por ID
export const getTaskCategoryByIdValidation = [
  param("id")
    .notEmpty()
    .withMessage("Debe mandar un id para borrar un usuario")
    .isInt()
    .withMessage("El id debe ser un número entero"),
];

// Validaciones para actualizar una relacion entre task y category
export const updateTaskCategoryValidation = [
  body("task_id")
    .isEmpty()
    .withMessage("'task_id' no debe estar vacio")
    .isInt()
    .withMessage("El task_id debe ser un entero"),
  body("category_id")
    .isEmpty()
    .withMessage("'task_id' no debe estar vacio")
    .isInt()
    .withMessage("El category_id debe ser un entero"),
];
