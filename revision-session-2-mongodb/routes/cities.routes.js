const express = require("express");
const {
  getCities,
  getCityById,
  postCity,
  replaceCityById,
} = require("../controllers/cities.controllers.js");
const extractCityFromDB = require("../middlewares/extractCityFromDB.js");
const { cityValidator } = require("../middlewares/validator.js");
const verifyAdmin = require("../middlewares/verifyAdmin.js");

const router = express.Router();

router.get("/", getCities);
router.get("/:id", extractCityFromDB, getCityById);

router.use(verifyAdmin);
router.use(cityValidator); //middleware applied to all routes below this line

router.post("/", postCity);
router.put("/:id", extractCityFromDB, replaceCityById);

export default router;
