const express = require("express");
const router = express.Router()
const blogController = require("../controllers/blog-controller");
const { validatePayloadMiddleware, jwtMiddleware } = require("../functions/jwt-functions");
const { validateParam, validateBody, schemas } = require("../validation/joi-validation");


router.route("/blogs")
    .get(blogController.showBlogs)
    .post(
        jwtMiddleware, 
        validateBody(schemas.joiBlogSchema), 
        blogController.createBlog
    );

router.route("/blogs/:id")
    .get(
        jwtMiddleware,
        validateParam(schemas.joiIdSchema, "id"), 
        blogController.showBlog
    )
    .put(
        jwtMiddleware,
        [
            validateParam(schemas.joiIdSchema, "id"),
            validateBody(schemas.joiBlogSchema) 
        ], 
        blogController.updateBlog
    )
    .delete(
        jwtMiddleware, 
        validateParam(schemas.joiIdSchema, "id"), 
        blogController.deleteBlog
    );


module.exports = router;
