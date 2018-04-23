const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./routes/not-protected");
const routesProtected = require("./routes/protected");
const config = require("./config");

app.use(bodyParser.json());
app.use(cors());
app.use('/', routes);
app.use('/', routesProtected);

app.listen(config.port, () => {
    console.log("SERVER IS RUNNING on port " + config.port);
});