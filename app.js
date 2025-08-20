import express from "express";
import { startDb } from "./src/config/database.js";
import "dotenv/config";
import taskRouter from "./src/routes/task.routes.js";
import userRouter from "./src/routes/user.routes.js";
import { AddressModel } from "./src/models/address.model.js"
import { CategoriesModel } from "./src/models/categories.model.js";
import { TaskCategoriesModel } from "./src/models/task_categories.model.js";
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use("/api", taskRouter);
app.use("/api", userRouter);

// Prueba
app.get("/categories", async (req, res) => {
    const categories = await CategoriesModel.findAll()
    res.json(categories);
});

app.get("/taskCategories", async (req, res) => {
    const taskCategories = await TaskCategoriesModel.findAll();

    res.json(taskCategories);
});
app.listen(PORT, async () => {
    await startDb();
    console.log(`SERVIDOR CORRIENDO EN: http://localhost:${PORT}`);
});