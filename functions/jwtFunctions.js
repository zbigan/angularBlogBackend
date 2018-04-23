const jwt = require('jsonwebtoken');
const config = require("../config");

const serverJWT_Secret = config.jwtSecret;

const jwtMiddleware = (req, res, next) => {
    /**
     * In JWT it is convention that the token is provided to the server in the authorization header including a prefix,
     * separated by a space. The authorization header could be:
     * 'Token eyJhbGciOiJIUzI1NiIsInR...' or 'Bearer eyJhbGciOiJIUzI1NiIsInR...' or something like this.
     */
    const authString = req.headers['authorization'];
    if(typeof authString === 'string' && authString.indexOf(' ') > -1) {
      const authArray = authString.split(' ');
      const token = authArray[1];
      jwt.verify(token, serverJWT_Secret, (err, decoded) => {
        if(err) {
            res.status(403).json("some shit failed to verify");

        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
        res.status(403).json("some shit no header");
    }
  };


/**
  * Middleware to check that a payload is present
  */
  const validatePayloadMiddleware = (req, res, next) => {
    if (req.body) {
      next();
    } else {
      res.status(403).send({
        errorMessage: 'You need a payload'
      });
    }
  };

  module.exports.jwtMiddleware = jwtMiddleware;
  module.exports.validatePayloadMiddleware = validatePayloadMiddleware;
  