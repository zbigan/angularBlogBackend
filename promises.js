const Blog = require("./models/blog-model");
const mongoose = require("mongoose");
const dbUserName = "user";
const dbPassword = "user";
const dbName = "blogauth";
databaseUrl = `mongodb://${dbUserName}:${dbPassword}@ds215208.mlab.com:15208/${dbName}`;
mongoose.connect(databaseUrl);


const showBlogs = async (req, res, next) => {
    try{
        const blogs = await Blog.find({});
        return blogs;
    } catch(err) {
        next(err);
    }
}



console.log(
    showBlogs()
    .then(
        blogs => console.log(blogs)
    )
);
