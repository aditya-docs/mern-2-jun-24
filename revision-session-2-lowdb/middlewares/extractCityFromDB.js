import db from "../index.js";

const extractCityFromDB = async (req, res, next) => {
  const { id: cityId } = req.params;
  const index = await db.data.cities.findIndex(({ id }) => id === cityId);
  if (index) {
    const data = await db.data.cities.find(({ id }) => id === cityId);
    req.city = {
      data,
      index,
    };
    return next();
  }
  res
    .status(404)
    .send({ message: `City with id: ${cityId} could not be found!` });
};

export default extractCityFromDB;
