import { body, param } from "express-validator";
import { TaskModel } from "../../models/task.model.js";

// Validaciones para crear una tarea nueva
export const createNewTaskValidation = [
  body("title")
    .trim()
    .isEmpty()
    .withMessage("El titulo no puede estar vacio")
    .isLength({ min: 5, max: 100 })
    .withMessage("El titulo no debe superar los 100 caracteres")
    .custom(async (value) => {
      const tareaExistente = await TaskModel.findOne({
        where: { title: value },
      });
      if (tareaExistente) throw new Error("El titulo ya existe");
    }),
  body("description")
    .trim()
    .isEmpty()
    .withMessage("La description no debe estar vacia")
    .isLength({ min: 7, max: 100 })
    .withMessage("La description no debe superar los 100 caracteres"),
  body("isComplete")
    .trim()
    .isBoolean()
    .withMessage(
      "Se debe especificar el atributo 'isComplete' con valores booleanos"
    ),
];

// Validaciones para borrar una tarea
export const deleteTaskValidation = [
  param("id")
    .notEmpty()
    .withMessage("Debe mandar un id para borrar un usuario")
    .isInt()
    .withMessage("El id debe ser un número entero"),
];

// Validaciones para traer una tarea por ID
export const getTaskByIdValidation = [
  param("id")
    .notEmpty()
    .withMessage("Debe mandar un id para borrar un usuario")
    .isInt()
    .withMessage("El id debe ser un número entero"),
];

// Validaciones para actualizar una tarea
export const updateTaskValidation = [
  body("title")
    .optional()
    .trim()
    .isEmpty()
    .withMessage("El titulo no puede estar vacio")
    .isLength({ min: 5, max: 100 })
    .withMessage("El titulo no debe superar los 100 caracteres")
    .custom(async (value) => {
      const tareaExistente = await TaskModel.findOne({
        where: { title: value },
      });
      if (tareaExistente) throw new Error("El titulo ya existe");
    }),
  body("description")
    .optional()
    .trim()
    .isEmpty()
    .withMessage("La description no debe estar vacia")
    .isLength({ min: 7, max: 100 })
    .withMessage("La description no debe superar los 100 caracteres"),
  body("isComplete")
    .optional()
    .trim()
    .isBoolean()
    .withMessage(
      "Se debe especificar el atributo 'isComplete' con valores booleanos"
    ),
];
