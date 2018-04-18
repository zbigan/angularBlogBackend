const express = require("express");
const router = express.Router()

const mongoose = require("mongoose");
const app = express();

const Blog = require("./models/blog");
const User = require("./models/user");

const jwtFunctions = require("./jwtFunctions");
const jwt = require('jsonwebtoken');


mongoose.connect("mongodb://localhost/blogWithAngular");


/**
 * Secret Encryption Key
 */
const serverJWT_Secret = 'kpTxN=)7mX3W3SEJ58Ubt8-';

/**
 * Log the user in.
 * User needs to provide pw and email, this is then compared to the pw in the "database"
 * If pw and email match, the user is fetched from the database.
 * Then the JWT-magic happens, where the jwt.sign function takes a JSON and a secret key (string) as an input,
 * and returns a token (string).
 * Finally the user and the generated token are returned from the request.
 */
app.post('/login', jwtFunctions.validatePayloadMiddleware, (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) throw err;
        if (!user) {
            res.status(401).send({success: false, msg: 'Authentication failed. User not found.'}
        )} else {
            user.comparePassword(req.body.password, function (err, isMatch){
                if (isMatch && !err) {
                    const token = jwt.sign({name: user.name, email: user.email}, serverJWT_Secret);
                    res.status(200).send({
                        user: {name: user.name, email: user.email},
                        token: token
                    });
                } else {
                    res.status(403).send({
                        errorMessage: 'Permission denied!'
                    });
                }
           
            });
        }
        
    });
});











router.get("/", (req, res) => {
    res.redirect("/blogs");
});

//INDEX ROUTE
router.get("/blogs", (req, res) => {
    Blog.find({}, (err, blogs) => {
        if(err){
            console.log("ERROR");
        } else{
            res.send(blogs);
        }
    });
});

//SHOW ROUTE
router.get("/detail/:id", jwtFunctions.jwtMiddleware, (req, res) => {
    Blog.findById(req.params.id, (err, blog) => {
        if(err){
            res.status(404);

            // console.log(req.params.id);
            res.redirect("/blogs");
        } else{
            res.status(200).send(blog);
        }
    });

});

// UPDATE ROUTE 
router.put('/detail/:id', (req, res) => {
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
    
});

//DELETE ROUTE
router.delete("/detail/:id", (req, res) => {
    Blog.findOneAndRemove( {_id: req.params.id}, (err, deleted) => {
        if (err){
          console.log(err);
        }  else {
            res.send(deleted);
        }
    });
});

//NEW BLOG GET
router.get("/blogs/new", jwtFunctions.jwtMiddleware, (req, res) => {
    res.status(200);
});

//NEW BLOG POST
router.post("/blogs", (req, res) => {
    const newBlog = new Blog
    (
        {
            title: req.body.title,
            image: req.body.image,
            // id: req.body.id,
            body: req.body.body
        }
    ) 
    newBlog.save((err, created) => {
        if(err){
            console.log(err);
        } else {
            res.send(created);
        }

    })  
    
});

//NEW USER
router.post("/users", (req, res) => {
    const newUser = new User
    (
        {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }
    ) 
    newUser.save((err, created) => {
        if(err){
            console.log(err);
        } else {
            res.send(created);
        }

    })  
    
});

module.exports = router