const config = {};

config.databaseUrl = "mongodb://user:user@ds215208.mlab.com:15208/blogauth";

config.jwtSecret = "kpTxN=)7mX3W3SEJ58Ubt8-";
config.port = process.env.port || 8001;
config.ip = process.env.ip;
config.userId;

module.exports = config;