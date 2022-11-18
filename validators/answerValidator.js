const Joi = require("joi");


module.exports = {
    addAnswer: Joi.object({
        questionId: Joi.number().integer().required(),
        choice: Joi.array().items(Joi.number().integer().required()),
        answer: Joi.string()
    }),
}

