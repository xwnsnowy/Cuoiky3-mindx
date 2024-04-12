import Joi from "joi";

export const inventorySchema = Joi.object({
  sku: Joi.string().required(),
  description: Joi.string(),
  instock: Joi.number().required(),
});
