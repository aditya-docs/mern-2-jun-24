import citySchema from "../schemas/city.schema.js";

const cityValidator = async (req, res, next) => {
  try {
    await citySchema.validateAsync(req.body);
    next();
  } catch (err) {
    return res.status(400).send({ message: err.details[0].message });
  }
};

export { cityValidator };
