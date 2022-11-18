const Joi = require("joi");


module.exports = {
    addChoice: Joi.object({
        questionId: Joi.number().integer().required(),
        choice: Joi.array().items(Joi.string().required()).required(),
    }),
    updateChoice: Joi.object({
        choice: Joi.string(),
        questionId: Joi.number().integer(),
    }),
}

