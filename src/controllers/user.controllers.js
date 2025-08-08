import { User } from "../models/user.model.js";

//Creacion de tareas
export const createNewUser = async (req,res) => {
    const {name, email, password} = req.body;
    const user = await User.create({name,email,password});
    res.status(201).json(user);
    try {
        const user = await User.create()
    } catch (err) {
        
    }
};

export const getAllUsers = async (req,res) => {
    try {
        const users = await User.findAll();

        if (users.length === 0) return res.status(404).json({errormessage: "No hay usuarios en la base de datos"});

        return res.status(200).json(users)
    } catch (error) {
        
    }
    
};

export const getUserById = async (req,res) => {
    try {
        const user = await User.findByPk(req.params.id);
                if  (user) {
                    res.status(200).json(user)
                } else {
                    res.status(404).json( {message: "Usuario no encontrado"} );  
                }
    } catch (error) {
        
    }
    
};

export const updateUser = async (req,res) => {
    try {
        const [updated] = await User.update(req.body, {where: {id:req.params.id}});
    } catch (error) {
        
    }
    
};

export const deleteUser = async (req,res) => {
    try {
        const deleted = await User.destroy({where: {id: req.params.id}})
    } catch (error) {
        
    }
    
};