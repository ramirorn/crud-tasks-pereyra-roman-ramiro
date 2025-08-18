import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { AddressModel } from "./address.model.js";

export const UserModel = sequelize.define(
    "User",
    {
        name: { type: DataTypes.STRING(100), allowNull: false },
        email: { type: DataTypes.STRING(100), unique: true, allowNull: false },
        password: { type: DataTypes.STRING(100), allowNull: false },
    },
);

UserModel.hasOne(AddressModel, {
    foreignKey: "address_id",
    as: "usuario"
})

AddressModel.belongsTo(UserModel, {
    foreignKey: "address_id",
    as: "address"
})