import { TaskModel } from "../models/task.model.js";
import { UserModel } from "../models/user.model.js";

//Creacion de tareas
export const createNewTask = async (req, res) => {
  const { title, description, isComplete, user_id } = req.body;

  try {
    //Creacion de la tarea asociada al usuario
    const task = await TaskModel.create({
      title,
      description,
      isComplete,
      user_id,
    });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllTasks = async (req, res) => {
  try {
    //Incluye el modelo de UserModel al momento de traer todas las tareas
    const tasks = await TaskModel.findAll({
      include: [
        { model: UserModel, as: "user", attributes: ["id", "name", "email"] },
      ],
    });

    return res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const task = await TaskModel.findByPk(req.params.id, {
      include: [
        { model: UserModel, as: "user", attributes: ["id", "name", "email"] },
      ],
    });
    if (task) {
      res.status(200).json(task);
    } else {
      res.status(404).json({ message: "Tarea no encontrada" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateTask = async (req, res) => {
  const { title, description, isComplete } = req.body;
  try {
    const [updated] = await TaskModel.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated > 0)
      return res
        .status(200)
        .json({ message: "La tarea fue actualizada con exito" });
    return res.status(404).json({ message: "Tarea no encontrada" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const deleted = await TaskModel.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.json({ message: "Tarea borrada exitosamente" });
    } else {
      res.status(404).json({ message: "Tarea no encontrada" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
