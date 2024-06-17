import { nanoid } from "nanoid";
import db from "../index.js";

const getCities = async (req, res) => {
  res.send(await db.data.cities);
};

const getCityById = async (req, res) => {
  res.send(req.city.data);
};

const postCity = async (req, res) => {
  db.data.cities.push({ ...req.body, id: nanoid() });
  await db.write();
  res.status(201).send({ message: "Created" });
};

const replaceCityById = async (req, res) => {
  const updatedCityObject = {
    id: req.params.id,
    ...req.body,
  };
  db.data.cities.splice(req.city.index, 1, updatedCityObject);
  await db.write();
  res.send(updatedCityObject);
};

export { getCities, getCityById, postCity, replaceCityById };
