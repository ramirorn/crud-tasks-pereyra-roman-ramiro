import { TaskModel } from "../models/task.model.js";
import { UserModel } from "../models/user.model.js";


//Creacion de tareas
export const createNewTask = async (req, res) => {
    const { title, description, isComplete } = req.body;
    if (req.body) {
        for (let value in req.body) {
            if (typeof req.body[value] === "string") {
                req.body[value] = req.body[value].trim();
            }
        }
    };

    try {
        // Validar la existencia del usuario
        const UserModel = await UserModel.findByPk(UserModel_id);
        if (!UserModel) return res.status(404).json({ errormessage: "El usuario no existe"});

        //Validaciones de title
        if (title === undefined || title === "") return res.status(400).json({ errormessage: "Title no puede estar vacio" })
        if (title.length > 100) return res.status(400).json({ errormessage: "El titulo no debe superar los 100 caracteres" })
        const titleUnique = await TaskModel.findOne({ where: { title: title } });
        if (titleUnique) return res.status(400).json({ errormessage: "El titulo ya existe" });

        //Validaciones de description
        if (description.length > 100) return res.status(400).json({ errormessage: "La descripcion no debe superar los 100 caracteres" })
        if (description === undefined || description === "") return res.status(400).json({ errormessage: "La descripcion no debe estar vacia" })
        //Validaciones de isComplete
        if (typeof isComplete !== "boolean") return res.status(400).json({ errormessage: "Debe ser un valor booleano" })
        
        //Creacion de la tarea asociada al usuario
        const TaskModel = await TaskModel.create({ title, description, isComplete, UserModel_id })
        res.status(201).json(TaskModel);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getAllTasks = async (req, res) => {
    try {
        //Incluye el modelo de UserModel al momento de traer todas las tareas
        const TaskModels = await TaskModel.findAll({
            include: [{model: UserModel, as: "UserModel", attributes: ["id","name", "email"]}]
        });

        if (TaskModels.length === 0) return res.status(404).json({ errormessage: "No hay tareas en la base de datos" });

        return res.status(200).json(TaskModels)
    } catch (err) {
        res.status(500).json({ error: err.message });
    }

};

export const getTaskById = async (req, res) => {
    try {
        const TaskModel = await TaskModel.findByPk(req.params.id, {
            include: [{ model: UserModel, as: "UserModel", attributes: ["id","name","email"]}]
        });
        if (TaskModel) {
            res.status(200).json(TaskModel)
        } else {
            res.status(404).json({ message: "Tarea no encontrada" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }

};

export const updateTask = async (req, res) => {
    const { title, description, isComplete } = req.body;
    if (req.body) {
        for (let value in req.body) {
            if (typeof req.body[value] === "string") {
                req.body[value] = req.body[value].trim();
            }
        }
    };
    try {
        //Validaciones de title
        if (title === undefined || title === "") return res.status(400).json({ errormessage: "Title no puede estar vacio" })
        if (title.length > 100) return res.status(400).json({ errormessage: "El titulo no debe superar los 100 caracteres" })
        const titleUnique = await TaskModel.findOne({ where: { title: title } });
        if (titleUnique) return res.status(400).json({ errormessage: "El titulo ya existe" });

        //Validaciones de description
        if (description.length > 100) return res.status(400).json({ errormessage: "La descripcion no debe superar los 100 caracteres" })
        if (description === undefined || description === "") return res.status(400).json({ errormessage: "La descripcion no debe estar vacia" })
        //Validaciones de isComplete
        if (typeof isComplete !== "boolean") return res.status(400).json({ errormessage: "Debe ser un valor booleano" })
        const [updated] = await TaskModel.update(req.body, { where: { id: req.params.id } });
        if (updated > 0) return res.status(200).json({ message: "La tarea fue actualizada con exito" });
        return res.status(404).json({ message: "Tarea no encontrada" })
    } catch (err) {
        res.status(500).json({ error: err.message });
    }

};

export const deleteTask = async (req, res) => {
    try {
        const deleted = await TaskModel.destroy({ where: { id: req.params.id } })
        if (deleted) {
            res.json({ message: "Tarea borrada exitosamente" })
        } else {
            res.status(404).json({ message: "Tarea no encontrada" })
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }

};