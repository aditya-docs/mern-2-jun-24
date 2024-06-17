import express from "express";
import {
  getCities,
  getCityById,
  postCity,
  replaceCityById,
} from "../controllers/cities.controllers.js";
import extractCityFromDB from "../middlewares/extractCityFromDB.js";
import { cityValidator } from "../middlewares/validator.js";
import verifyAdmin from "../middlewares/verifyAdmin.js";

const router = express.Router();

router.get("/", getCities);
router.get("/:id", extractCityFromDB, getCityById);

router.use(verifyAdmin);
router.use(cityValidator); //middleware applied to all routes below this line

router.post("/", postCity);
router.put("/:id", extractCityFromDB, replaceCityById);

export default router;
