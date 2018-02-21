var db    = require('../models'),
    jwt   = require('jsonwebtoken');

exports.signIn = function(req, res) {
//   var userName = {userName: req.body.userName};
//   var email = {email: req.body.email};
//   var password = {password: req.body.password};
//   var authData;
//   if(userName.length > 0 && password.length > 0) {
//     authData = userName;
//   } else if(email.length > 0 && password.length > 0) {
//     authData = email;
//   } else {
//     res.status(400).json({message: "username or email and password can't be blanc"})
//   }
// console.log(authData);

  db.User.findOne({userName: req.body.userName}).then(function(user) {
    user.comparePassword(req.body.password, function(err, isMatch) {
      if(isMatch) {
        var token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY);
        res.status(200).json({
          userId: user.id,
          userName: user.userName,
          email: user.email,
          isAdmin: user.isAdmin,
          token
          })
      } else {
        res.status(400).json({message: 'Invalid Email/Password.'})
      }
    })
  }).catch(function(err) {
    res.status(400).json({message: 'Invalid Email/Password.'})
  })
}

exports.signUp = function(req, res, next) {
  db.User.create(req.body).then(function(user) {
    var token = jwt.sign({userId: user.id}, process.env.SECRET_KEY);
    res.status(200).json({
      userId: user.id,
      userName: user.userName,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName
    });
  }).catch(function(err) {
    res.send(err);
  })
}

exports.getUser = function(req, res, next) {
  db.User.find({_id: req.params.userId}).sort({ createdAt: 'desc' })
  .populate("userId", {userName: true}).then(function(user) {
    res.status(200).json(user);
  }).catch(function(err) {
    res.status(500).json(err);
  })
}

exports.updateUser = function(req, res) {
  db.User.findOneAndUpdate({ _id: req.params.userId }, req.body, { new: true })
    .then(function(user) {
        res.json(user);
    })
    .catch(function(err) {
        res.send(err);
    });
}

exports.deleteUser = function(req, res, next) {
  db.User.remove({_id: req.params.userId}).then(function() {
    res.json({msg: "We deleted it!"});
  }).catch(function(err) {
    res.json(err);
  })
}

module.exports = exports;