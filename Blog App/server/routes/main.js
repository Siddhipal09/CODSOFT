const express = require('express')
const router = express.Router();
const Post = require('../models/Post');


// Home route
router.get('/', async (req, res) => {
  try {
    const locals = {
      title: "NodeJs Blog",
      description: "simple blog created with NodeJs, Express & MongoDb."
    };
    const posts = await Post.find({});
    res.render('index', { locals, data: posts });
  } catch (error) {
    console.log(error);
   
  }
});

// Post Route
router.get('/post/:id', async (req, res) => {
  
  try{
     let slug = req.params.id;

    const data = await Post.findById({_id: slug});
    const locals = {
      title: data.title,
      description: "simple blog created with NodeJs, Express & MongoDb."
    }
    res.render('post', {locals, data});
  }catch(error){
    console.log(error);
  }
  });


  //about Route
router.get('/about', (req, res) => {
  res.render('about');
});

//contact Route
router.get('/contact', (req, res) => {
  res.render('contact');
});

module.exports = router;


// search Route
router.post('/search', async (req, res) => {
  try {
    const locals = {
      title: "Search",
      description: "simple blog created with NodeJs, Express & MongoDb."
    }
    
    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9]/g, "")

    const data = await Post.find({
      $or:[
        { title: {$regex: new RegExp(searchNoSpecialChar, 'i')}},
        { body: {$regex: new RegExp(searchNoSpecialChar, 'i')}}
      ]
      
    });
    res.render("search",{
     data,
     locals
    });
  } catch (error) {
    console.log(error);
   
  }
});




//function insertPostData () {
//  Post.insertMany([
//    {
//      title: "Building a blog",
//      body: "This is the body text"
//    },
//    {
//      title: "Building a blog2",
//      body: "This is the body text2"
//    },
//    {
//      title: "Building a blog3",
//      body: "This is the body text3"
//    },
//  ])
//}
//insertPostData();