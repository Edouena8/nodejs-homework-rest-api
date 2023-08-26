const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(3).max(20).required(),
});

module.exports = {
  addSchema,
};
