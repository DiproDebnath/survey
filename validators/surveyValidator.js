const Joi = require("joi");

module.exports = {
  addSurvey: Joi.object({
    name: Joi.string().required(),
  }),
  updateSurvey : Joi.object({
    name: Joi.string().required(),
  }), 
};


