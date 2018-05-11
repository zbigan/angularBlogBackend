const express = require("express");
const router = express.Router()

const jwtFunctions = require("../functions/jwtFunctions");
const blogController = require("../controllers/blog-controller");
const loginLogic = require("../functions/login-logic");

const User = require("../models/user-model");
const Joi = require("joi");
// const validateParam = require("../helpers/routeHelpers").validateParam;
//TAS PATS:
const { validateParam, schemas } = require("../helpers/routeHelpers");


//INDEX ROUTE
router.route("/blogs")
    .get(blogController.showBlogs);

//LOGIN ROUTE
router.route("/login")
    .post(jwtFunctions.validatePayloadMiddleware, loginLogic.authentication);

//NEW USER
router.route("/users")
    .post(blogController.createUser);


/////////////////////////////////////////
/////////////////////////////////////////
router.route("/users/:name")
    .get(validateParam( schemas.joiNameSchema, "name" ), 
        (req, res) => {
            const {userName} = req.value.params;
            // console.log(req.params.name);
            User.findOne({"name": req.value.params.name}, (err, user) => {
                if(err){
                    console.log("ERROR");
                } else{
                    res.status(200).send(user);
                }
        });
    });
////////////////////////////////////////
////////////////////////////////////////
module.exports = router
