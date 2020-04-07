const express = require('express');
const dotenv = require('dotenv');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

// configs and middleware
require('./data/reddit-db'); // set db
const app = express();
dotenv.config({ path: '.env' });
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(express.static('public'));
app.set('view engine', 'handlebars');



// require controllers
const homeController = require('./controllers/home')
const postsController = require('./controllers/posts');


// define routes
app.get('/', homeController.getHome);
app.get('/posts/new', postsController.getNewPostForm); // add isAuthenticated rule
app.post('/posts/new', postsController.postNewPost); // add isAuthenticated rule
app.get("/posts/:id", postsController.getPost);



// run server
app.listen(process.env.PORT, () => {
  console.log(`Listening on ${process.env.PORT}`);
});