const express = require("express");
const router = express.Router()
const userController = require("../controllers/user-controller");
const { validateBody, schemas } = require("../validation/joi-validation");
const { validatePayloadMiddleware } = require("../functions/jwt-functions");


router.route("/users")
    .post(
        validateBody(schemas.joiUserSchema), 
        userController.createUser
    );

router.route("/login")
    .post(
        validatePayloadMiddleware, 
        userController.authenticate
    );


module.exports = router;
