import { AddressModel } from "../models/address.model.js";

//Creacion de una direccion
export const createNewAddress = async (req, res) => {
  const { street, street_number, neighborhood } = req.body;

  try {
    //Creacion de la direccion
    const address = await AddressModel.create({
      street,
      street_number,
      neighborhood,
    });
    res.status(201).json(address);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
  }
};

// Traer todas las direcciones
export const getAllAddresses = async (req, res) => {
  try {
    //Trae todos los usuarios con sus tareas asociadas
    const addresses = await AddressModel.findAll();

    return res.status(200).json(addresses);
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

export const getAddressById = async (req, res) => {
  try {
    //Trae todos los usuarios con sus tareas asociadas
    const address = await AddressModel.findByPk(req.params.id);
    if (address) {
      res.status(200).json(address);
    } else {
      res.status(404).json({ message: "Direccion no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};
