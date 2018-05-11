const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const routesAll = require("./routes/blog-routes");
const config = require("./config");

app.use(bodyParser.json());
app.use(cors());
app.use('/', routesAll);

app.listen(config.port, config.ip, () => {
    console.log("SERVER IS RUNNING on port " + config.port);
});