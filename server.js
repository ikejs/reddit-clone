const express = require('express');
const dotenv = require('dotenv');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');


// configs and middleware
require('./data/reddit-db'); // set db
const app = express();
dotenv.config({ path: '.env' });
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(express.static('public'));
app.set('view engine', 'handlebars');



// require controllers
const homeController = require('./controllers/home')
const authController = require('./controllers/auth')
const postController = require('./controllers/posts');
const commentController = require('./controllers/comments');


// define routes
app.get('/', homeController.getHome);
app.get('/sign-up', authController.getSignUp);
app.post('/sign-up', authController.postSignUp);
app.get('/posts/new', postController.getNewPostForm); // add isAuthenticated rule
app.post('/posts/new', postController.postNewPost); // add isAuthenticated rule
app.get("/posts/:id", postController.getPost);
app.get("/n/:subreddit", postController.getSubReddit);
app.post('/posts/:postId/comments', commentController.postNewComment);



// run server
app.listen(process.env.PORT, () => {
  console.log(`Listening on ${process.env.PORT}`);
});


module.exports = app;