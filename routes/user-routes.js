const express = require("express");
const router = express.Router()
const { createUser, authenticateUser } = require("../controllers/user-controller");
const { validateBody } = require("../validation/joi-validation-logic");
const { joiUserLoginSchema, joiUserRegistrationSchema } = require("../validation/joi-schemas");

router.route("/users")
    .post(
        validateBody(joiUserRegistrationSchema), 
        createUser
    );

router.route("/login")
    .post(
        validateBody(joiUserLoginSchema),
        authenticateUser
    );


module.exports = router;
