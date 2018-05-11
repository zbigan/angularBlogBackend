const User = require("../models/user-model");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("../config");

mongoose.connect(config.databaseUrl);

const serverJWT_Secret = config.jwtSecret;

const authentication = (req, res) => {
    config.userId = "";
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) throw err;
        if (!user) {
            res.status(401).send({success: false, msg: 'Authentication failed. User not found.'}
        )} else {
            user.comparePassword(req.body.password, function (err, isMatch){
                if (isMatch && !err) {
                    config.userId = user._id;
                    // console.log(config.userId);
                    const token = jwt.sign({name: user.name, email: user.email}, serverJWT_Secret);
                    res.status(200).send({
                        user: {name: user.name, email: user.email},
                        token: token
                    });
                } else {
                    res.status(403).send({
                        errorMessage: 'Permission denied!'
                    });
                }
           
            });
        }
        
    });
}

module.exports.authentication = authentication;
