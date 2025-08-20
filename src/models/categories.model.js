import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const CategoriesModel = sequelize.define(
    "Categories",
    {
        category_id: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false},
        is_urgent: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
        is_group: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false}
    }
) 

