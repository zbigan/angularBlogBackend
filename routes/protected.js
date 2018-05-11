const express = require("express");
const router = express.Router()

const jwtFunctions = require("../functions/jwtFunctions");
const blogController = require("../controllers/blog-controller");
const loginLogic = require("../functions/login-logic");

// router.use(jwtFunctions.jwtMiddleware);

//SHOW ROUTE
router.get("/detail/:id", blogController.showBlog);

// UPDATE ROUTE 
router.put('/detail/:id', blogController.updateBlog);

//DELETE ROUTE
router.delete("/detail/:id", blogController.deleteBlog);

//NEW BLOG POST
router.post("/blogs", blogController.createBlog);

module.exports = router