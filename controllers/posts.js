// GET POST FORM
exports.getNewPost = (req, res) => {
  res.render('posts-new', {
    title: "New Post",
    postsNewActive: true
  })
};

// CREATE POST
exports.postNewPost = (req, res) => {
  console.log(req.body);
};