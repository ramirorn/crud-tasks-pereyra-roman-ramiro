import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { UserModel } from "./user.model.js";

export const AddressModel = sequelize.define(
    "Address",
    {
        address_id: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false},
        street: { type: DataTypes.STRING(100), allowNull: false},
        street_number: { type: DataTypes.INTEGER, allowNull: false},
        neighborhood: { type: DataTypes.STRING(100), allowNull: false}
    },
    {
        paranoid: true,
        createdAt: false,
        updatedAt: false
    }
)
UserModel.belongsTo(AddressModel, {
    foreignKey: "address_id",
    as: "address"
})

AddressModel.hasOne(UserModel, {
    foreignKey: "address_id",
    as: "usuario1"
})
