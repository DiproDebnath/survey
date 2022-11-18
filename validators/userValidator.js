const Joi = require("joi");

module.exports = {
  loginUser: Joi.object({
    email: Joi.string().email().required(),
  })
};


