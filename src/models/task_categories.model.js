import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { CategoriesModel } from "./categories.model.js";
import { TaskModel } from "./task.model.js";

export const TaskCategoriesModel = sequelize.define(
    "taskCategories",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        }
    },
    {
        timestamps: false,
    }
);

// // Relacion muchos a muchos
// TaskCategoriesModel.belongsTo(TaskModel, {foreignKey: "tasks_id"})
// TaskCategoriesModel.belongsTo(CategoriesModel, {foreignKey: "category_id"})

TaskModel.belongsToMany(CategoriesModel, {
    through: TaskCategoriesModel,
    foreignKey: "task_id",
    otherKey:"category_id",
    as: "categories"


})
CategoriesModel.belongsToMany(TaskModel, {
    through: TaskCategoriesModel,
    foreignKey: "category_id",
    otherKey: "task_id",
    as: "tasksByCategory"

})