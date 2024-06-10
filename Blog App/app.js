require('dotenv').config();


const express = require('express')
const path = require('path'); 
const expressLayout = require('express-ejs-layouts')
const methodOverride = require('method-override')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const connectDB = require('./server/config/db')
const app = express()
const port = 3000 
   connectDB();
   app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

   app.use(express.urlencoded({ extended: true}));
   app.use(express.json());
   app.use(cookieParser());
   app.use(methodOverride('_method'));
   app.use(session({
     secret: 'keyboard cat',
     resave: false,
     saveUninitialized: true,
     store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI
     })
   }))

app.use(express.static('public'));
// Templating engine
app.use(expressLayout);
app.set('layout','./layouts/main');
app.set('view engine','ejs');

app.use('/',require('./server/routes/main'));
app.use('/',require('./server/routes/admin'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})