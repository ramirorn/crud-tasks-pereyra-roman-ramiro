import express from "express";
import { startDB } from "./src/config/database.js";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT;

app.listen(PORT, async () => {
    await startDB();
    console.log(`SERVIDOR CORRIENDO EN: http://localhost:${PORT}`);
});