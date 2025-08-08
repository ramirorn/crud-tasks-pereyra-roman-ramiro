import { Task } from "../models/task.model.js";

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
        //Validaciones de title
        if (title === undefined || title === "") return res.status(400).json({ errormessage: "Title no puede estar vacio" })
        if (title.length > 100) return res.status(400).json({ errormessage: "El titulo no debe superar los 100 caracteres" })
        const titleUnique = await Task.findOne({ where: { title: title } });
        if (titleUnique) return res.status(400).json({ errormessage: "El titulo ya existe" });

        //Validaciones de description
        if (description.length > 100) return res.status(400).json({ errormessage: "La descripcion no debe superar los 100 caracteres" })
        if (description === undefined || description === "") return res.status(400).json({ errormessage: "La descripcion no debe estar vacia" })
        //Validaciones de isComplete
        if (typeof isComplete !== "boolean") return res.status(400).json({ errormessage: "Debe ser un valor booleano" })
        //Creacion de los personajes
        const task = await Task.create({ title, description, isComplete })
        res.status(201).json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll();

        if (tasks.length === 0) return res.status(404).json({ errormessage: "No hay tareas en la base de datos" });

        return res.status(200).json(tasks)
    } catch (err) {
        res.status(500).json({ error: err.message });
    }

};

export const getTaskById = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (task) {
            res.status(200).json(task)
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
        const titleUnique = await Task.findOne({ where: { title: title } });
        if (titleUnique) return res.status(400).json({ errormessage: "El titulo ya existe" });

        //Validaciones de description
        if (description.length > 100) return res.status(400).json({ errormessage: "La descripcion no debe superar los 100 caracteres" })
        if (description === undefined || description === "") return res.status(400).json({ errormessage: "La descripcion no debe estar vacia" })
        //Validaciones de isComplete
        if (typeof isComplete !== "boolean") return res.status(400).json({ errormessage: "Debe ser un valor booleano" })
        const [updated] = await Task.update(req.body, { where: { id: req.params.id } });
        if (updated > 0) return res.status(200).json({ message: "La tarea fue actualizada con exito" });
        return res.status(404).json({ message: "Tarea no encontrada" })
    } catch (err) {
        res.status(500).json({ error: err.message });
    }

};

export const deleteTask = async (req, res) => {
    try {
        const deleted = await Task.destroy({ where: { id: req.params.id } })
        if (deleted) {
            res.json({ message: "Tarea borrada exitosamente" })
        } else {
            res.status(404).json({ message: "Tarea no encontrada" })
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }

};