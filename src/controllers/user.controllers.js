import { UserModel } from "../models/user.model.js";

//Creacion de tareas
export const createNewUser = async (req, res) => {
    const { name, email, password } = req.body;
    if (req.body) {
        for (let value in req.body) {
            if (typeof req.body[value] === "string") {
                req.body[value] = req.body[value].trim();
            }
        }
    };
    try {
        //Validaciones de name
        if (name === undefined || name === "") return res.status(400).json({ errormessage: "name no puede estar vacio" })
        if (name.length > 100) return res.status(400).json({ errormessage: "El nombre no debe superar los 100 caracteres" })

        //Validaciones de email
        if (email.length > 100) return res.status(400).json({ errormessage: "El email no debe superar los 100 caracteres" })
        if (email === undefined || email === "") return res.status(400).json({ errormessage: "El email no debe estar vacio" })

        //Validaciones de password
        if (password.length > 100) return res.status(400).json({ errormessage: "La contraseña no debe superar los 100 caracteres" })
        if (password === undefined || password === "") return res.status(400).json({ errormessage: "La contraseña no debe estar vacia" })

        //Creacion de los personajes
        const UserModel = await UserModel.create({ name, email, password })
        res.status(201).json(UserModel);
    } catch (err) {
        res.status(500).json({ error: err.message });
        console.log(err)
    }
};

export const getAllUser = async (req, res) => {
    try {
        //Trae todos los usuarios con sus tareas asociadas
        const UserModels = await UserModel.findAll({include:[{model: Task, as: "tasks"}]});

        if (UserModels.length === 0) return res.status(404).json({ errormessage: "No hay usuarios en la base de datos" });

        return res.status(200).json(UserModels)
    } catch (error) {
        res.status(500).json({ error: err.message });
    }

};

export const getUserById = async (req, res) => {
    try {
        //Trae todos los usuarios con sus tareas asociadas
        const UserModel = await UserModel.findByPk(req.params.id, {
            include:[{ model: Task, as: "tasks"}]});
        if (UserModel) {
            res.status(200).json(UserModel)
        } else {
            res.status(404).json({ message: "Usuario no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: err.message });
    }

};

export const updateUser = async (req, res) => {
    const { name, email, password } = req.body;
    if (req.body) {
        for (let value in req.body) {
            if (typeof req.body[value] === "string") {
                req.body[value] = req.body[value].trim();
            }
        }
    };
    try {
        //Validaciones de name
        if (name === undefined || name === "") return res.status(400).json({ errormessage: "name no puede estar vacio" })
        if (name.length > 100) return res.status(400).json({ errormessage: "El nombre no debe superar los 100 caracteres" })

        //Validaciones de email
        if (email.length > 100) return res.status(400).json({ errormessage: "El email no debe superar los 100 caracteres" })
        if (email === undefined || email === "") return res.status(400).json({ errormessage: "El email no debe estar vacio" })

        //Validaciones de password
        if (password.length > 100) return res.status(400).json({ errormessage: "La contraseña no debe superar los 100 caracteres" })
        if (password === undefined || password === "") return res.status(400).json({ errormessage: "La contraseña no debe estar vacia" })

        const [updated] = await UserModel.update(req.body, { where: { id: req.params.id } });

        if (updated > 0) return res.status(200).json({ message: "El usuario fue actualizado exitosamente" });
        return res.status(404).json({ message: "El usuario no fue encontado" })
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error)
    }

};

export const deleteUser = async (req, res) => {
    try {
        const deleted = await UserModel.destroy({ where: { id: req.params.id } })
        if (deleted) {
            res.json({ message: "Usuario borrado exitosamente" })
        } else {
            res.status(404).json({ message: "Usuario no encontrado" })
        }
    } catch (error) {
        res.status(500).json({ error: err.message });
    }

};