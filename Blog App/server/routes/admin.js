const express = require('express')
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Post = require('../models/Post');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const adminLayout = '../views/layouts/admin';
const jwtSecret = process.env.JWT_SECRET;


// Set storage engine
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Initialize upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // 1MB limit
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
}).single('image');

// Check file type
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}






// admin login page
router.get('/admin', async (req, res) => {
  try {
    const locals = {
      title: "Admin",
      description: "simple blog created with NodeJs, Express & MongoDb."
    };

    res.render('admin/index', { locals, layout: adminLayout });
  } catch (error) {
    console.log(error);

  }
});


router.post('/admin', async (req, res) => {
  const { username, password } = req.body;
  const action = req.body.action;
  if (action === 'Login') {
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' })
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' })
      }
      const token = jwt.sign({ userId: user._id }, jwtSecret);
      res.cookie('token', token, { httpOnly: true });
      

     res.redirect('/');

    } catch (error) {
      console.log(error);

    }
  } else if (action === 'Register') {
     //register

    try {
      const { username, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      try {
        const user = await User.create({ username, password: hashedPassword })
        await user.save();
        res.redirect('/admin');
       
      } catch (error) {
        if (error.code === 11000) {
          res.status(409).json({ message: 'User already in use' })
        }
        res.status(500).json({ message: 'Internal server error' })
      }

    } catch (error) {
      console.log(error);

    }


  }
});
// dashboard
router.get('/dashboard', authMiddleware, async (req, res) => {

  try {

    const locals = {
      title: "Dashboard",
      description: "Dashboard"
    };
    const data = await Post.find();
    res.render('admin/dashboard', { locals, data, layout: adminLayout })

  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

//admin create post
router.get('/add-post', authMiddleware, async (req, res) => {

  try {

    const locals = {
      title: "Add Post",
      description: "Blog Post"
    };
    const data = await Post.find();
    res.render('admin/add-post', { locals, data, layout: adminLayout })

  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.post('/add-post', authMiddleware, async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.log(err);
      return res.status(400).send('Error uploading file.');
    }

    const { title, body } = req.body;
    if (!title || !body) {
      return res.status(400).send('Title and body are required.');
    }

    let imagePath = '';
    if (req.file) {
      imagePath = req.file.path;
    }

    const newPost = new Post({
      title,
      body,
      imagePath
    });

    try {
      await newPost.save();
      res.redirect('/dashboard');
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
    }
  });
//  try {
//    console.log(req.body)
//
//    try {
//      const newPost = new Post({
//        title: req.body.title,
//        body: req.body.body,
 //       imagePath: req.file.path
 //     })
 //     await Post.create(newPost);
 //     res.redirect('/dashboard');
 //   } catch (error) {
 //     console.log(error)
 //   }
 // } catch (error) {
 //   console.log(error)
 // }
});


//admin edit post
router.put('/edit-post/:id', authMiddleware, async (req, res) => {

  try {

    await Post.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      body: req.body.body,
      updatedAt: Date.now()
    });
    res.redirect(`/edit-post/${req.params.id}`);

  } catch (error) {
    console.log(error)
  }
});


router.get('/edit-post/:id', authMiddleware, async (req, res) => {

  try {
    const locals = {
      title: "Edit Post",
      description: "Blog Post"
    }
    const data = await Post.findOne({ _id: req.params.id })
    res.render('admin/edit-post', {
      locals, data, layout: adminLayout
    })

  } catch (error) {
    console.log(error)
  }
});


//delete
router.delete('/delete-post/:id', authMiddleware, async (req, res) => {
  try {
    await Post.deleteOne({ _id: req.params.id })
    res.redirect('/dashboard')
  } catch (error) {
    console.log(error)
  }

})

//logout
router.get('/logout', (req, res) => {
  res.clearCookie('token')
  // res.json({message: 'Logout successfully'});
  res.redirect('/');
});




//router.post('/admin', async (req, res) => {
//    try {
//       const{username, password} = req.body;
//       console.log(req.body)
//       if(req.body.username === 'admin' && req.body.password === 'password'){
//        res.send('You are logged in.')
//       }else{
//        res.send('Wrong username or password')
//       }
//      
//      
//    } catch (error) {
//      console.log(error);
//     
//    }
//  });





module.exports = router;