const Joi = require("joi");

const cityValidatonSchema = Joi.object({
  name: Joi.string().required(),
  landmarks: Joi.array().items(
    Joi.object({
      name: Joi.string(),
      price: Joi.number(),
    })
  ),
});

module.exports = cityValidatonSchema;
// name: string
// landmarks?: array
//     item: object
//     properties:
//         name: string
//         price: number
