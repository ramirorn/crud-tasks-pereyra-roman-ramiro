import express from "express";
import { startDb } from "./src/config/database.js";
import "dotenv/config";
import userRouter from "./src/routes/user.routes.js";
import taskRouter from "./src/routes/task.routes.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use("/api", userRouter);
app.use("/api", taskRouter);

app.listen(PORT, async () => {
    await startDb();
    console.log(`SERVIDOR CORRIENDO EN: http://localhost:${PORT}`);
});