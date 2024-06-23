const express = require("express");
const {
  getCities,
  getCityById,
  postCity,
  replaceCityById,
} = require("../controllers/cities.controllers.js");
const cityValidatonSchema = require("../validators/city.schema");
const validateSchema = require("../middlewares/validator");
const verifyAdmin = require("../middlewares/verifyAdmin");

const router = express.Router();

router.get("/", getCities);
router.get("/:id", getCityById);

router.use(verifyAdmin);
router.use(validateSchema(cityValidatonSchema)); //middleware applied to all routes below this line

router.post("/", postCity);
// router.put("/:id", extractCityFromDB, replaceCityById);

module.exports = router;
