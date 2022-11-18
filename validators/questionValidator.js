const Joi = require("joi");


module.exports = {
    addQuestion: Joi.object({
        question: Joi.string().required(),
        surveyId: Joi.number().integer().required(),
        questionType: Joi.string().valid('single', 'multiple').required(),   
    }),
    updateQuestion: Joi.object({
        question: Joi.string(),
        surveyId: Joi.number().integer(),
        questionType: Joi.string().valid('single', 'multiple'),   
    }),
}

