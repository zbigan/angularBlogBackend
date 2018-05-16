const Joi = require("joi");

module.exports = {
    joiBlogSchema: Joi.object().keys({
        title: Joi.string().required(),
        image: Joi.string().regex(/^http/),
        body: Joi.string()
    }),

    joiUserLoginSchema: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required()            
    }),

    joiUserRegistrationSchema: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }),
    
    joiIdSchema: Joi.object().keys({
        param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()            
    })
}