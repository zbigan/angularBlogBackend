const express = require("express");
const router = express.Router()
const { createUser, authenticateUser } = require("../controllers/user-controller");
const { validateBody, schemas } = require("../validation/joi-validation");


router.route("/users")
    .post(
        validateBody(schemas.joiUserSchema), 
        createUser
    );

router.route("/login")
    .post(
        authenticateUser
    );


module.exports = router;
