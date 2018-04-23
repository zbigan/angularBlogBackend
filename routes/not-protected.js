const express = require("express");
const router = express.Router()

const jwtFunctions = require("../functions/jwtFunctions");
const mongooseFunctions = require("../functions/mongoose-functions");
const loginLogic = require("../functions/login-logic");

//INDEX ROUTE
router.get("/blogs", mongooseFunctions.showBlogs);

//LOGIN ROUTE
router.post('/login', jwtFunctions.validatePayloadMiddleware, loginLogic.authentication);

module.exports = router
