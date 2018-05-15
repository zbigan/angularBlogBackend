const jwt = require('jsonwebtoken');
const config = require("../config");
const jwtSecret = config.jwtSecret;


module.exports = {
    jwtMiddleware: async (req, res, next) => {
        try {
            const header = await req.headers["authorization"];
            if(typeof header === "string" && header.indexOf(" ") > -1) {
                const array = header.split(" ");
                const token = array[1];
                console.log(token);
                const verified = await jwt.verify(token, jwtSecret);
                if(verified) {
                    next();
                } else {
                    res.status(401).json("Token failed to varify");
                }
            } else {
                res.status(403).json("No token in header");
            }
        } catch(err) {
            next(err);
        }
    }
}