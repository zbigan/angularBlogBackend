const User = require("../models/user-model");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("../config");
const bcrypt = require("bcrypt");
const saltRounds = 10;

mongoose.connect(config.databaseUrl);

const jwtSecret = config.jwtSecret;


module.exports = {
    //CREATE USER (WITH VALIDATION)
    createUser: async (req, res, next) => {
        try{            
            const newUser = new User(req.value.body);
            const password = req.value.body.password;
            const passwordHashed = await bcrypt.hash(password, saltRounds);
            newUser.password = passwordHashed;
            const result = await newUser.save();
            res.status(200).json({success: true});
        } catch(err){
            next(err);
        }  
    },

    //AUTHENTICATE USER (WITH VALIDATION)
    authenticateUser: async (req, res, next) => {
        try {
            const password = req.value.body.password;
            const email = req.value.body.email;
            const userFromDb = await User.find({email});
            if (userFromDb[0]){
                const match = await bcrypt.compare(password, userFromDb[0].password);
                if (match) {
                    config.userId = userFromDb[0]._id;
                    const token = await jwt.sign({name: userFromDb.name, email: userFromDb.email}, jwtSecret);
                    res.status(200).send({
                        user: {name: userFromDb.name, email: userFromDb.email},
                        token: token
                    });
                } else {
                    res.status(401).json("Failed to authorize. Wrong password!");
                }
            } else {
                res.status(403).json("Failed to authorize. No such user!");
            }
        } catch(err) {
            next(err);
        }
    }
}