import Joi from "joi";

const citySchema = Joi.object({
  name: Joi.string().required(),
  landmarks: Joi.array().items(
    Joi.object({
      name: Joi.string(),
      price: Joi.number(),
    })
  ),
});

export default citySchema;
// name: string
// landmarks?: array
//     item: object
//     properties:
//         name: string
//         price: number
