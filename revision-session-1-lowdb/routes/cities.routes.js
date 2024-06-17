import express from "express";
import { getCities, postCity } from "../controllers/cities.controllers.js";

const router = express.Router();

router.get("/", getCities);

router.post("/", postCity);

export default router;
