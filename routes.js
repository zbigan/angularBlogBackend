const express = require("express");
const router = express.Router()

const jwtFunctions = require("./functions/jwtFunctions");
const mongooseFunctions = require("./functions/mongoose-functions");
const loginLogic = require("./functions/login-logic");


router.post('/login', jwtFunctions.validatePayloadMiddleware, loginLogic.authentication);

router.get("/", (req, res) => {
    res.redirect("/blogs");
});

//INDEX ROUTE
router.get("/blogs", mongooseFunctions.showBlogs);

//SHOW ROUTE
router.get("/detail/:id", jwtFunctions.jwtMiddleware, mongooseFunctions.showBlog);

// UPDATE ROUTE 
router.put('/detail/:id', mongooseFunctions.updateBlog);

//DELETE ROUTE
router.delete("/detail/:id", mongooseFunctions.deleteBlog);

//NEW BLOG GET
router.get("/blogs/new", jwtFunctions.jwtMiddleware, (req, res) => {
    res.status(200);
});

//NEW BLOG POST
router.post("/blogs", mongooseFunctions.createBlog);

//NEW USER
router.post("/users", mongooseFunctions.createUser);

module.exports = router