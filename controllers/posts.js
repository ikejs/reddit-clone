const Post = require('../models/Post');


// GET POST FORM
exports.getNewPost = (req, res) => {
  res.render('posts-new', {
    title: "New Post",
    postsNewActive: true
  })
};

// CREATE POST
exports.postNewPost = (req, res) => {
  const post = new Post(req.body);
  post.save((err, post) => {
    return res.redirect('/');
  })
};