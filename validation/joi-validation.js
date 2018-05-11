const Joi = require("joi");

module.exports = {
    validateParam: (schema, paramName) => {
        return (req, res, next) => {
        
            const result = Joi.validate({ param: req["params"][paramName] }, schema);
            
            if(result.error){
                console.log("joi failed to validate", paramName);
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
        joiBlogIdSchema: Joi.object().keys({
            param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        })
    }
}