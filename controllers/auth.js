const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.getSignUp = (req, res) => {
  res.render('sign-up');
}

exports.postSignUp = (req, res) => {
  // Create User and JWT
  const user = new User(req.body);

  user
    .save()
    .then(user => {
      var token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: "60 days" });
      res.redirect("/");
    })
    .catch(err => {
      console.log(err.message);
      return res.status(400).send({ err: err });
    });
}