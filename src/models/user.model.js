import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const User = sequelize.define(
    "User",
    {
        name: { type: DataTypes.STRING(100), allowNull: false},
        email: { type: DataTypes.STRING(100), unique: true, allowNull: false},
        password: { type: DataTypes.STRING(100), allowNull: false},
    },
);