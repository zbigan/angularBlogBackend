const express = require("express");
const router = express.Router()

const jwtFunctions = require("../functions/jwtFunctions");
const mongooseFunctions = require("../functions/mongoose-functions");
const loginLogic = require("../functions/login-logic");

router.use(jwtFunctions.jwtMiddleware);

//SHOW ROUTE
router.get("/detail/:id", mongooseFunctions.showBlog);

// UPDATE ROUTE 
router.put('/detail/:id', mongooseFunctions.updateBlog);

//DELETE ROUTE
router.delete("/detail/:id", mongooseFunctions.deleteBlog);

//NEW BLOG POST
router.post("/blogs", mongooseFunctions.createBlog);

//NEW USER
router.post("/users", mongooseFunctions.createUser);

module.exports = router