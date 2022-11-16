const Joi = require("joi");

const surveySchema = {
  addSurvey: Joi.object({
    name: Joi.string().required(),
  }),
  updateSurvey : Joi.object({
    name: Joi.string().required(),
  }), 
};

module.exports = surveySchema;
