import express from "express";
import { JSONFilePreset } from "lowdb/node";
import cityRouter from "./routes/cities.routes.js";

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
