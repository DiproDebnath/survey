const createHttpError = require('http-errors')
//* Include joi to check error type 
const Joi = require('joi')

const Validators = require('../validators')

/**
 * 
 * @param {string} validator 
 * @param {string} schema 
 * @returns object
 */
module.exports = function(validator, schema) {
    
    if(!Validators.hasOwnProperty(validator))
        throw new Error(`'${validator}' validator is not exist`)

    return async function(req, res, next) {
        try {
            const validated = await Validators[validator][schema].validateAsync(req.body)
            req.body = validated
           
            next()
        } catch (err) {
            if(err.isJoi) 
                return next(createHttpError(422, {message: err.message}))
            next(createHttpError(500))
        }
    }
}