const express = require("express");
const router = express.Router()
const jwtFunctions = require("../functions/jwt-functions");
const blogController = require("../controllers/blog-controller");
const loginLogic = require("../functions/login-logic");
const { validateParam, schemas } = require("../validation/joi-validation");


// router.use(jwtFunctions.jwtMiddleware);

router.route("/detail/:id")
    .get(validateParam(schemas.joiBlogIdSchema, "id"), blogController.showBlog)
    .put(validateParam(schemas.joiBlogIdSchema, "id"), blogController.updateBlog)
    .delete(validateParam(schemas.joiBlogIdSchema, "id"), blogController.deleteBlog);

router.route("/blogs")
    .get(blogController.showBlogs)
    .post(blogController.createBlog);

//LOGIN ROUTE
router.route("/login")
    .post(jwtFunctions.validatePayloadMiddleware, loginLogic.authentication);

//NEW USER
router.route("/users")
    .post(blogController.createUser);


module.exports = router
