const Joi = require("joi");

module.exports = {
    validateParam: (schema, paramName) => {
        return (req, res, next) => {
            // console.log('req.params', req.params);
            const result = Joi.validate({ param: req["params"][paramName] }, schema);
            // console.log(result);

            if(result.error){
                res.status(400).json(result.error);
            } else{
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

    schemas: {
        joiNameSchema: Joi.object().keys({
            param: Joi.string().regex(/h$/).required()
        })
    }
}