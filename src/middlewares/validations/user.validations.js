import { body, param } from "express-validator";
import { UserModel } from "../../models/user.model.js";

// Validaciones para crear un nuevo usuario
export const createNewUserValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name no tiene que estar vacio")
    .isString()
    .withMessage(
      "Name debe ser una cadena de caracteres, o string para los socios"
    )
    .isLength({ min: 5, max: 100 }),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("El email no debe de estar vacio")
    .isLength({ min: 5, max: 100 })
    .withMessage(
      "El email debe contener 5 caracteres como minimo y no debe superar los 100"
    )
    .isEmail()
    .withMessage(
      "El email debe tener formato de correo electronico: 'alguien@gmail.com'"
    )
    .custom(async (value) => {
      const existente = await UserModel.findOne({ where: { email: value } });
      if (existente) throw new Error("El email ya existe");
    }),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("La contraseña no debe estar vacia")
    .isLength({ min: 5, max: 100 })
    .withMessage(
      "La contraseña debe contener 5 caracteres como minimo y no debe superar los 100"
    ),
];

// Validaciones para borrar un usuario
export const deleteUserValidation = [
  param("id")
    .notEmpty()
    .withMessage("Debe mandar un id para borrar un usuario")
    .isInt()
    .withMessage("El id debe ser un número entero"),
];

// Validaciones para traer un usuario por ID
export const getByIdValidation = [
  param("id")
    .notEmpty()
    .withMessage("Debe mandar un id para borrar un usuario")
    .isInt()
    .withMessage("El id debe ser un número entero"),
];

// Validaciones para actualizar un usuario
export const updateUserValidation = [
  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Name no tiene que estar vacio")
    .isString()
    .withMessage(
      "Name debe ser una cadena de caracteres, o string para los socios"
    )
    .isLength({ min: 5, max: 100 }),
  body("email")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El email no debe de estar vacio")
    .isLength({ min: 5, max: 100 })
    .withMessage(
      "El email debe contener 5 caracteres como minimo y no debe superar los 100"
    )
    .isEmail()
    .withMessage(
      "El email debe tener formato de correo electronico: 'alguien@gmail.com'"
    )
    .custom(async (value) => {
      const existente = await UserModel.findOne({ where: { email: value } });
      if (existente) throw new Error("El email ya existe");
    }),
  body("password")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("La contraseña no debe estar vacia")
    .isLength({ min: 5, max: 100 })
    .withMessage(
      "La contraseña debe contener 5 caracteres como minimo y no debe superar los 100"
    ),
];
