import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { UserModel } from "./user.model.js";

export const TaskModel = sequelize.define(
    "Task",
    {
        title: { type: DataTypes.STRING(100), unique: true, allowNull: false },
        description: { type: DataTypes.STRING(100), allowNull: false },
        is_complete: { type: DataTypes.BOOLEAN, defaultValue: false }
    },
    {
        timestamps: false,
    }
);

TaskModel.belongsTo(UserModel, {
    foreignKey: "user_id",
    as: "tasks"
})

UserModel.hasMany(TaskModel, {
    foreignKey:"user_id",
    as: "user"
})

