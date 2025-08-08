import { Task } from "../models/task.model.js";

//Creacion de tareas
export const createNewTask = async (req,res) => {
    const {title, description, isComplete} = req.body;
    if (req.body) {
        for (let value in req.body) {
            if (typeof req.body[value] === "string") {
                req.body[value] = req.body[value].trim();
            }
        }
    };

    try {
        //Validaciones
        if (title === undefined || title === "") return res.status(400).json({errormessage: "Title no puede estar vacio"})
        if (description === undefined || description === "") return res.status(400).json({errormessage: "Description no puede estar vacio"})
        if (isComplete === undefined || isComplete === "") return res.status(400).json({errormessage: "IsComplete no puede estar vacio"})
        
        //Creacion de los personajes
        const task = await Task.create({title, description, isComplete})
        res.status(201).json(task);
    } catch (err) {
        
    }
};

export const getAllTasks = async (req,res) => {
    try {
        const tasks = await Task.findAll();

        if (tasks.length === 0) return res.status(404).json({ errormessage: "No hay tareas en la base de datos"});

        return res.status(200).json(tasks)
    } catch (error) {
        
    }
    
};

export const getTaskById = async (req,res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (task) {
            res.status(200).json(task)
        } else {
            res.status(404).json( {message: "Tarea no encontrada"} );  
        }
    } catch (error) {
        
    }
    
};

export const updateTask = async (req,res) => {
    try {
        const [updated] = await Task.update(req.body, {where: {id:req.params.id}});
    } catch (error) {
        
    }
    
};

export const deleteTask = async (req,res) => {
    try {
        const deleted = await Task.destroy({where: {id: req.params.id}})
    } catch (error) {
        
    }
    
};