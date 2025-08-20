import express from "express";
import { startDb } from "./src/config/database.js";
import "dotenv/config";
import taskRouter from "./src/routes/task.routes.js";
import userRouter from "./src/routes/user.routes.js";
import addressRouter from "./src/routes/address.routes.js";
import categoriesRouter from "./src/routes/categories.routes.js";
import taskCategoriesRouter from "./src/routes/task_categories.routes.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use("/api", taskRouter);
app.use("/api", userRouter);
app.use("/api", addressRouter);
app.use("/api", categoriesRouter);
app.use("/api", taskCategoriesRouter)

app.listen(PORT, async () => {
    await startDb();
    console.log(`SERVIDOR CORRIENDO EN: http://localhost:${PORT}`);
});