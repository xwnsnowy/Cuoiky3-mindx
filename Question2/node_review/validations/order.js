import Joi from "joi";

export const orderSchema = Joi.object({
  item: Joi.string().required(),
  price: Joi.number().required(),
  quantity: Joi.number().required(),
});
