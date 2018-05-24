const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const blogRoutes = require("./routes/blog-routes");
const userRoutes = require("./routes/user-routes");
const config = require("./config");

app.use(bodyParser.json());
app.use(cors());
app.use('/', blogRoutes);
app.use('/', userRoutes);

app.listen(config.port, () => {
    console.log("SERVER IS RUNNING on port " + config.port);
});