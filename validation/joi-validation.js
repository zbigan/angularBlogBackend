const Joi = require("joi");

module.exports = {
    validateParam: (schema, paramName) => {
        return (req, res, next) => {
        
            const result = Joi.validate({ param: req["params"][paramName] }, schema);
            
            if(result.error){
                res.status(400).json(result.error);
            } else {
                if(!req.value){
                    req.value = {};
                }
                if(!req.value.params){
                    req.value.params = {};
                } 

                req.value["params"][paramName] = result.value.param;
                next();
            }    
        }   
    },

    validateBody: (schema) => {
        return (req, res, next) => {
            const result = Joi.validate(req.body, schema);
            if(result.error){
                res.status(400).json(result.error);
            } else {
                if(!req.value){
                    req.value = {};
                }
                if(!req.value.body){
                    req.value.body = {};
                }
                
                req.value.body = result.value;
                next();
            }
        }
    },

    schemas: {
        joiBlogSchema: Joi.object().keys({
            title: Joi.string().required(),
            image: Joi.string().regex(/^http/),
            body: Joi.string()
        }),

        joiUserSchema: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required()
        }),
        
        joiIdSchema: Joi.object().keys({
            param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        })
    }
}