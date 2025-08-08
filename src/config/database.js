// Importaciones 
import { Sequelize } from "sequelize";
import "dotenv/config";

export const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT
    },

);

export const startDb = async () => {
    try {
        await sequelize.authenticate();
        console.log("Conexion exitosa con la base de datos");
        await sequelize.sync();
    } catch (error) {
        console.log("Error en la conexion con la base de datos:", error)
    };
};