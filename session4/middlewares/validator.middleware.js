const Joi = require("joi");
const getQueryErrors = require("../validators/validator");

const userSearchSchema = Joi.object({
  gender: Joi.string().valid("male", "female"),
  age: Joi.number().integer().min(0).max(100),
}).or("gender", "age");

const userSearchValidator = (req, res, next) => {
  const error = getQueryErrors(userSearchSchema, req.query);
  if (error) return res.status(422).send({ message: error.details[0].message });
  next();
};

module.exports = { userSearchValidator };
