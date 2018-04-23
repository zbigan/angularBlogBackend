const User = require("./models/user");
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');

mongoose.connect("mongodb://localhost/blogWithAngular");

const serverJWT_Secret = 'kpTxN=)7mX3W3SEJ58Ubt8-';

const authentication = (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) throw err;
        if (!user) {
            res.status(401).send({success: false, msg: 'Authentication failed. User not found.'}
        )} else {
            user.comparePassword(req.body.password, function (err, isMatch){
                if (isMatch && !err) {
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
