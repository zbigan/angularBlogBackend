const express = require("express");

const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

const Blog = require("./models/blog");
const User = require("./models/user");

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

const routes = require("./blogRoutes");


app.use('/', routes);




 
app.listen(8001, () => {
    console.log("SERVER IS RUNNING on port 8001");
});