const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./blogRoutes");

app.use(bodyParser.json());
app.use(cors());
app.use('/', routes);

app.listen(8001, () => {
    console.log("SERVER IS RUNNING on port 8001");
});