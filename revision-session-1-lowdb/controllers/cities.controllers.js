import { nanoid } from "nanoid";
import db from "../index.js";

const getCities = async (req, res) => {
  res.send(await db.data.cities);
};

const postCity = async (req, res) => {
  db.data.cities.push({ ...req.body, id: nanoid() });
  await db.write();
  res.status(201).send({ message: "Created" });
};

export { getCities, postCity };
