const Blog = require("../models/blog");
const User = require("../models/user");
const config = require("../config");

const mongoose = require("mongoose");
mongoose.connect(config.databaseUrl);

//INDEX ROUTE
const showBlogs = (req, res) => {
    Blog.find({}, (err, blogs) => {
        if(err){
            console.log("ERROR");
        } else{
            res.send(blogs);
        }
    });
}

//SHOW ROUTE
const showBlog = (req, res) => {
    Blog.findById(req.params.id, (err, blog) => {
        if(err){
            res.status(404);
            res.redirect("/blogs");
        } else{
            res.status(200).send(blog);
        }
    });

}

//UPDATE ROUTE
const updateBlog = (req, res) => {
    const blog = {
        title: req.body.title,
        image: req.body.image,
        body: req.body.body,
      }
      Blog.findByIdAndUpdate(req.params.id, { title: req.body.title, image: req.body.image, body: req.body.body }, (err, updated) => {
        if (err) {
          res.send(err);
        }
        res.send(updated);
      });
    
}

//DELETE ROUTE
const deleteBlog = (req, res) => {
    Blog.findOneAndRemove( {_id: req.params.id}, (err, deleted) => {
        if (err){
          console.log(err);
        }  else {
            res.send(deleted);
        }
    });
}

//CREATE BLOG ROUTE
const createBlog = (req, res) => {
    const newBlog = new Blog({
        title: req.body.title,
        image: req.body.image,
        body: req.body.body
    }) 
    newBlog.save((err, created) => {
        if(err){
            console.log(err);
        } else {
            res.send(created);
        }
    })  
}

//CREATE USER ROUTE
const createUser = (req, res) => {
    const newUser = new User ({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }) 
    newUser.save((err, created) => {
        if(err){
            console.log(err);
        } else {
            res.send(created);
        }
    })  
}

module.exports.showBlogs = showBlogs;
module.exports.showBlog = showBlog;
module.exports.updateBlog = updateBlog;
module.exports.deleteBlog = deleteBlog;
module.exports.createBlog = createBlog;
module.exports.createUser = createUser;