import { Task } from "../models/task.model.js";

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
        if (title === undefined || title === "") return res.status(400).json({errormessage: "Title no puede estar vacio"})
        if (description === undefined || description === "") return res.status(400).json({errormessage: "Description no puede estar vacio"})
        if (isComplete === undefined || isComplete === "") return res.status(400).json({errormessage: "IsComplete no puede estar vacio"})
        
    } catch (err) {
        
    }
}