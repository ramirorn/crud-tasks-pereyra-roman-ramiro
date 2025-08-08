import express from "express";
import { startDb } from "./src/config/database.js";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.listen(PORT, async () => {
    await startDb();
    console.log(`SERVIDOR CORRIENDO EN: http://localhost:${PORT}`);
});