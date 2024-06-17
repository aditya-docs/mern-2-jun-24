import express from "express";
import { JSONFilePreset } from "lowdb/node";
import dotenv from "dotenv";
import cityRouter from "./routes/cities.routes.js";

dotenv.config();

const defaultData = { cities: [] };
const db = await JSONFilePreset("db.json", defaultData);

const app = express();
const PORT = 8088;

app.use(express.json());

app.use("/cities", cityRouter);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

export default db;
