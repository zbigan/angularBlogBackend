const Blog = require("../models/blog-model");
const User = require("../models/user-model");
const config = require("../config");
const mongoose = require("mongoose");

mongoose.connect(config.databaseUrl);


module.exports = {
    //INDEX ROUTE

    showBlogs: async (req, res, next) => {
        try{
            const blogs = await Blog.find({});
            res.status(200).json(blogs);
        } catch(err) {
            next(err);
        }
    },

    //SHOW ROUTE (WITH VALIDATION)
    showBlog: async (req, res, next) => {
        try{
            const { id } = req.params;
            const blog = await Blog.findById(id);
            res.status(200).json(blog);
        } catch(err){
            next(err);
        }
    },

    //UPDATE ROUTE (WITH VALIDATION)
    updateBlog: async (req, res, next) => {
        try{
            const { id } = req.value.params;
            const newBlog = req.value.body;
            const result = await Blog.findByIdAndUpdate(id, newBlog);
            res.status(200).json({success: true});
        } catch(err){
            next(err);
        }
    },

    //DELETE ROUTE (WITH VALIDATION)
    deleteBlog: async (req, res, next) => {
        try{
            const id = req.value.params.id;
            await Blog.findOne({_id: id}, async (err, blog) => {
                try{
                    const authorId = blog.author;
                    const author = await User.findById(authorId);
                    const index = author.blogs.indexOf(id);
                    author.blogs.splice(index, 1);
                    await author.save();   
                    await Blog.deleteOne(blog);                 
                    res.status(200).json({success: true});
                } catch(err){
                    next(err);
                }
            });
        } catch(err){
            next(err);
        }
    },

    //CREATE BLOG ROUTE (WITH VALIDATION)
    createBlog: async (req, res, next) => {
        try{
            userId = config.userId;
            const newBlog = new Blog(req.value.body);
            const user = await User.findById(userId);
            newBlog.author = user;
            await newBlog.save(async () => {
                try {
                    user.blogs.push(newBlog);
                    await user.save();
                    res.status(201).json(newBlog);    
                } catch(err) {
                    next(err);
                }
            });
        } catch(err){
            next(err);
        }
    }
}