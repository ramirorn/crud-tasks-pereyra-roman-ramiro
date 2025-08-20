import { CategoriesModel } from "../models/categories.model.js";

//Creacion de una categoria
export const createNewCategory = async (req, res) => {
    const { is_urgent, is_group} = req.body;
    if (req.body) {
        for (let value in req.body) {
            if (typeof req.body[value] === "string") {
                req.body[value] = req.body[value].trim();
            }
        }
    };
    try {
        //Validaciones de is_urgent
        if (is_urgent === undefined || is_urgent === "") return res.status(400).json({ errormessage: "is_urgent no puede estar vacio" })
        if (typeof is_urgent !== "boolean") return res.status(400).json({ errormessage: "El valor de is_urgent debe ser un boolean" })

        //Validaciones de is_group
        if (is_group === undefined || is_group=== "") return res.status(400).json({ errormessage: "is_group no puede estar vacio" })
        if (typeof is_group !== "boolean") return res.status(400).json({ errormessage: "El valor de is_group debe ser un boolean" })



        //Creacion de la categoria
        const category = await CategoriesModel.create({ is_group, is_urgent})
        res.status(201).json(category);
    } catch (err) {
        res.status(500).json({ error: err.message });
        console.log(err)
    }
};

// Traer todas las categorias
export const getAllCategories = async (req, res) => {
    try {
        //Trae todos los usuarios con sus tareas asociadas
        const categories = await CategoriesModel.findAll();

        if (categories.length === 0) return res.status(404).json({ errormessage: "No hay categorias en la base de datos" });

        return res.status(200).json(categories)
    } catch (error) {
        res.status(500).json({ error: err.message });
    }
};

//Traer una categortia por id
export const getCategoryById = async (req, res) => {
    try {
        //Trae todos los usuarios con sus tareas asociadas
        const category = await CategoriesModel.findByPk(req.params.id);
        if (category) {
            res.status(200).json(category)
        } else {
            res.status(404).json({ message: "Categoria no encontrada" });
        }
    } catch (error) {
        res.status(500).json({ error: err.message });
    }

};