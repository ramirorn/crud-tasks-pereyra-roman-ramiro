import { CategoriesModel } from "../models/categories.model.js";

//Creacion de una categoria
export const createNewCategory = async (req, res) => {
  const { is_urgent, is_group } = req.body;

  try {
    //Creacion de la categoria
    const category = await CategoriesModel.create({ is_group, is_urgent });
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
  }
};

// Traer todas las categorias
export const getAllCategories = async (req, res) => {
  try {
    //Trae todos los usuarios con sus tareas asociadas
    const categories = await CategoriesModel.findAll();

    return res.status(200).json(categories);
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
      res.status(200).json(category);
    } else {
      res.status(404).json({ message: "Categoria no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};
