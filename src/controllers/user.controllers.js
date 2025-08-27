import { UserModel } from "../models/user.model.js";

//Creacion de tareas
export const createNewUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    //Creacion de los personajes
    const usuarios = await UserModel.create({ name, email, password });
    res.status(201).json(usuarios);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
  }
};

export const getAllUser = async (req, res) => {
  try {
    //Trae todos los usuarios con sus tareas asociadas
    const UserModels = await UserModel.findAll();

    return res.status(200).json(UserModels);
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    //Trae todos los usuarios con sus tareas asociadas
    const user = await UserModel.findByPk(req.params.id, {
      include: [{ model: Task, as: "tasks" }],
    });
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

export const updateUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const [updated] = await UserModel.update(req.body, {
      where: { id: req.params.id },
    });

    if (updated > 0)
      return res
        .status(200)
        .json({ message: "El usuario fue actualizado exitosamente" });
    return res.status(404).json({ message: "El usuario no fue encontado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const deleted = await UserModel.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.json({ message: "Usuario borrado exitosamente" });
    } else {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};
