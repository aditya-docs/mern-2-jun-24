const City = require("../models/city.model");

const getCities = async (req, res) => {
  try {
    res.send(await City.find());
  } catch (error) {
    res.sendStatus(500);
  }
};

const getCityById = async (req, res) => {
  try {
    const reqCity = await City.findById(req.params.id);
    if (reqCity) return res.send(reqCity);
    res.sendStatus(404);
  } catch (error) {
    if (error.message.includes("Cast to ObjectId failed"))
      return res.status(422).send({ message: "Invalid city id" });
    res.status(500).send({ message: "Something went wrong! Please try again" });
  }
};

const postCity = async (req, res) => {
  // await City.create(req.body)
  try {
    res.status(201).send(await new City(req.body).save());
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).send({
        message:
          "City with the same name already exists. Please try a unique name",
      });
    }
    console.error(error);
    res
      .status(500)
      .send({ message: "Failed to insert in DB, please try again" });
  }
};

// const replaceCityById = async (req, res) => {
//   const updatedCityObject = {
//     id: req.params.id,
//     ...req.body,
//   };
//   db.data.cities.splice(req.city.index, 1, updatedCityObject);
//   await db.write();
//   res.send(updatedCityObject);
// };

module.exports = { getCities, getCityById, postCity };
