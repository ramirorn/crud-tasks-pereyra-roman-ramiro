import { AddressModel } from "../models/address.model.js";

//Creacion de una direccion
export const createNewAddress = async (req, res) => {
    const { street, street_number, neighborhood } = req.body;
    if (req.body) {
        for (let value in req.body) {
            if (typeof req.body[value] === "string") {
                req.body[value] = req.body[value].trim();
            }
        }
    };
    try {
        //Validaciones de street
        if (street === undefined || street === "") return res.status(400).json({ errormessage: "Street no puede estar vacio" })
        if (street.length > 100) return res.status(400).json({ errormessage: "La calle no debe superar los 100 caracteres" })

        //Validaciones de street_number
        if (street_number.length > 4) return res.status(400).json({ errormessage: "La altura de la calle no debe superar los 4 digitos" })
        if (street_number === undefined || street_number === "") return res.status(400).json({ errormessage: "La altura de la calle no debe estar vacia" })

        //Validaciones de neighborhood
        if (neighborhood.length > 100) return res.status(400).json({ errormessage: "El barrio no debe superar los 100 caracteres" })
        if (neighborhood === undefined || neighborhood === "") return res.status(400).json({ errormessage: "El barrio no debe estar vacia" })

        //Creacion de la direccion
        const address = await AddressModel.create({ street, street_number, neighborhood })
        res.status(201).json(address);
    } catch (err) {
        res.status(500).json({ error: err.message });
        console.log(err)
    }
};

// Traer todas las direcciones
export const getAllAddresses = async (req, res) => {
    try {
        //Trae todos los usuarios con sus tareas asociadas
        const addresses = await AddressModel.findAll();

        if (addresses.length === 0) return res.status(404).json({ errormessage: "No hay direcciones en la base de datos" });

        return res.status(200).json(addresses)
    } catch (error) {
        res.status(500).json({ error: err.message });
    }
};

export const getAddressById = async (req, res) => {
    try {
        //Trae todos los usuarios con sus tareas asociadas
        const address = await AddressModel.findByPk(req.params.id);
        if (address) {
            res.status(200).json(address)
        } else {
            res.status(404).json({ message: "Direccion no encontrada" });
        }
    } catch (error) {
        res.status(500).json({ error: err.message });
    }

};