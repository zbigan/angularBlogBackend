const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blogWithAngular");

const Blog = require("./models/blog");

const data = [
    {
        title: 'My last summer', 
        image: 'http://www.ansa.it/webimages/ch_600x/2017/5/31/107df34e1d864278cf667e1f37af43ae.jpg',
        body: 'A lot of sun, sea and other pleasuresss!',
        id: '1' 
    },
    {
        title: 'All my sportcars', 
        image: 'https://img.newatlas.com/sema-2016-sports-gallery-82.jpg?auto=format%2Ccompress&ch=Width%2CDPR&fit=crop&h=347&q=60&rect=0%2C115%2C1617%2C910&w=616&s=758ef47e4bb334767c394e28118b99f5',
        body: 'I need for speed!!!!',
        id: '2'
    }
    
  ];

function seedDB(){
    //Remove all Blogs
    Blog.remove({}, (err) => {
        if(err){
            console.log(err);
        }
        console.log("Removed blogs");
    });

    //add blogs
    data.forEach((seed) => {
        Blog.create(seed, (err, character) => {
            if(err){
                console.log(err);
            } else{
                console.log("Added a blog");
                
            }
        });
    });
    return console.log("success");
    
    
}

seedDB();