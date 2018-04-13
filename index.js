const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
// const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
// import * as fs from "fs";

const Blog = require("./models/blog");
const User = require("./models/user");

mongoose.connect("mongodb://localhost/blogWithAngular");
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

/**
 * Secret Encryption Key
 */
const serverJWT_Secret = 'kpTxN=)7mX3W3SEJ58Ubt8-';

/**
 * Middleware to check that a payload is present
 */
const validatePayloadMiddleware = (req, res, next) => {
  if (req.body) {
    next();
  } else {
    res.status(403).send({
      errorMessage: 'You need a payload'
    });
  }
};

/**
 * Log the user in.
 * User needs to provide pw and email, this is then compared to the pw in the "database"
 * If pw and email match, the user is fetched from the database.
 * Then the JWT-magic happens, where the jwt.sign function takes a JSON and a secret key (string) as an input,
 * and returns a token (string).
 * Finally the user and the generated token are returned from the request.
 */
app.post('/login', validatePayloadMiddleware, (req, res) => {
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

  const jwtMiddleware = (req, res, next) => {
    /**
     * In JWT it is convention that the token is provided to the server in the authorization header including a prefix,
     * separated by a space. The authorization header could be:
     * 'Token eyJhbGciOiJIUzI1NiIsInR...' or 'Bearer eyJhbGciOiJIUzI1NiIsInR...' or something like this.
     */
    const authString = req.headers['authorization'];
    if(typeof authString === 'string' && authString.indexOf(' ') > -1) {
      const authArray = authString.split(' ');
      const token = authArray[1];
      jwt.verify(token, serverJWT_Secret, (err, decoded) => {
        if(err) {
            res.status(403).json("some shit failed to verify");

        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
        res.status(403).json("some shit no header");
    }
  };


app.get("/", (req, res) => {
    res.redirect("/blogs");
});

//USERS ROUTE
app.get("/users", (req, res) => {
    User.find({}, (err, users) => {
        if(err){
            console.log("ERROR");
        } else{
            res.send(users);
        }
    });
});

//INDEX ROUTE
app.get("/blogs", (req, res) => {
    Blog.find({}, (err, blogs) => {
        if(err){
            console.log("ERROR");
        } else{
            res.send(blogs);
        }
    });
});

//SHOW ROUTE
app.get("/detail/:id", jwtMiddleware, (req, res) => {
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
app.put('/detail/:id', (req, res) => {
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
app.delete("/detail/:id", (req, res) => {
    Blog.findOneAndRemove( {_id: req.params.id}, (err, deleted) => {
        if (err){
          console.log(err);
        }  else {
            res.send(deleted);
        }
    });
});

//NEW BLOG GET
app.get("/blogs/new", jwtMiddleware, (req, res) => {
    res.status(200);
});

//NEW BLOG POST
app.post("/blogs", (req, res) => {
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
app.post("/users", (req, res) => {
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


app.listen(8001, () => {
	console.log("Server is running at port 8001");
});