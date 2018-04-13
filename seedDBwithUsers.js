const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blogWithAngular");

const User = require("./models/user");

const data = [
    {
        name: 'John Walter', 
        email: 'john@gmail.com',
        password: '1234'
    },
    {
        name: 'Will Smith', 
        email: 'will@gmail.com',
        password: '1235'
    },
    
  ];

function seedDB(){
    
    // User.remove({}, (err) => {
    //     if(err){
    //         console.log(err);
    //     }
    //     console.log("Removed users");
    // });

    
    data.forEach((seed) => {
        User.create(seed, (err, character) => {
            if(err){
                console.log(err);
            } else{
                console.log("Added a user");
                
            }
        });
    });
    return console.log("success");
    
    
}

seedDB();