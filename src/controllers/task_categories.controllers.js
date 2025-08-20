import { TaskCategoriesModel } from "../models/task_categories.model.js";

//Creacion de una TaskCategory
export const taskCategoryCreate = async (req, res) => {
    const { task_id, category_id} = req.body;
    try {
        //Validaciones de task_id 
        if (!task_id || !Number.isInteger(task_id)) return res.status(400).json({ errormessage: "task_id no puede estar vacio y debe ser un entero" })
        
        //Validaciones de category_id
        if (!category_id || !Number.isInteger(category_id)) return res.status(400).json({ errormessage: "category_id no puede estar vacio y debe ser un entero" })
        


        //Creacion de la categoria
        const taskCategory = await TaskCategoriesModel.create(req.body)
        res.status(201).json(taskCategory);
    } catch (err) {
        res.status(500).json({ error: err.message });
        console.log(err)
    }
};

// Traer todas las categorias
export const getAllTaskCategories = async (req, res) => {
    try {
        //Trae todos los usuarios con sus tareas asociadas
        const taskCategories = await TaskCategoriesModel.findAll();

        if (taskCategories.length === 0) return res.status(404).json({ errormessage: "No hay taskCategories en la base de datos" });

        return res.status(200).json(taskCategories)
    } catch (error) {
        res.status(500).json({ error: err.message });
    }
};

//Traer una categortia por id
export const getTaskCategoryById = async (req, res) => {
    try {
        //Trae todos los usuarios con sus tareas asociadas
        const taskCategory = await TaskCategoriesModel.findByPk(req.params.id);
        if (taskCategory) {
            res.status(200).json(taskCategory)
        } else {
            res.status(404).json({ message: "TaskCategorie no encontrada" });
        }
    } catch (error) {
        res.status(500).json({ error: err.message });
    }

};