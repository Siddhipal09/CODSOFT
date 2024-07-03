const express = require('express')
const router = express.Router();
const Post = require('../models/Post');
const authMiddleware = require('../middleware/authMiddleware')


// Home route
router.get('/', async (req, res) => {
  try {
    const locals = {
      title: "Blog Town",
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
   
    const data = await Post.findById({_id: slug}).populate('comments.userId', 'username');
    const locals = {
      title: data.title,
      description: "simple blog created with NodeJs, Express & MongoDb.",
      userId: req.userId
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
// Add comment route
router.post('/posts/:postId/comments', authMiddleware, async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const newComment = {
      userId: req.userId,
      content: req.body.content
    };

    post.comments.push(newComment);
    await post.save();

    res.redirect(`/post/${postId}`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});




