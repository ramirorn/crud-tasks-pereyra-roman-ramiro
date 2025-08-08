import { User } from "../models/user.model.js";

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
        const user = await User.create({ name, email, password })
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
        console.log(err)
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();

        if (users.length === 0) return res.status(404).json({ errormessage: "No hay usuarios en la base de datos" });

        return res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ error: err.message });
    }

};

export const getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            res.status(200).json(user)
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

        const [updated] = await User.update(req.body, { where: { id: req.params.id } });

        if (updated > 0) return res.status(200).json({ message: "El usuario fue actualizado exitosamente" });
        return res.status(404).json({ message: "El usuario no fue encontado" })
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error)
    }

};

export const deleteUser = async (req, res) => {
    try {
        const deleted = await User.destroy({ where: { id: req.params.id } })
        if (deleted) {
            res.json({ message: "Usuario borrado exitosamente" })
        } else {
            res.status(404).json({ message: "Usuario no encontrado" })
        }
    } catch (error) {
        res.status(500).json({ error: err.message });
    }

};