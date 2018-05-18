const express = require("express");
const router = express.Router()
const blogController = require("../controllers/blog-controller");
const { jwtMiddleware } = require("../functions/jwt-token-verification");
const { validateParam, validateBody } = require("../validation/joi-validation-logic");
const { joiBlogSchema, joiIdSchema } = require("../validation/joi-schemas");


router.route("/blogs")
    .get(
        blogController.showBlogs
        // .then(blogs => res.status(200).json(blogs))
    )
    .post(
        jwtMiddleware,
        validateBody(joiBlogSchema), 
        blogController.createBlog
    );

router.route("/blogs/:id")
    .get(
        jwtMiddleware,
        validateParam(joiIdSchema, "id"), 
        blogController.showBlog
    )
    .put(
        jwtMiddleware,
        [
            validateParam(joiIdSchema, "id"),
            validateBody(joiBlogSchema) 
        ], 
        blogController.updateBlog
    )
    .delete(
        jwtMiddleware, 
        validateParam(joiIdSchema, "id"), 
        blogController.deleteBlog
    );


module.exports = router;
