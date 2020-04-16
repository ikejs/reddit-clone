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

exports.getLogin = (req, res) => {
  res.render('login');
}

exports.postLogin = (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username }, "username password")
    .then(user => {
      if (!user) {
        return res.status(401).send({ message: "Wrong Username or Password" });
      }
      user.comparePassword(password, (err, isMatch) => {
        if (!isMatch) {
          return res.status(401).send({ message: "Wrong Username or password" });
        }
        const token = jwt.sign({ _id: user._id, username: user.username }, process.env.SECRET, {
          expiresIn: "60 days"
        });
        res.cookie("nToken", token, { maxAge: 900000, httpOnly: true });
        res.redirect("/");
      });
    })
    .catch(err => {
      console.log(err);
    });
}

exports.logout = (req, res) => {
  res.clearCookie('nToken');
  res.redirect('/');
}