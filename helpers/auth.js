var db    = require('../models'),
    jwt   = require('jsonwebtoken');

/**
 * Login user base on the userName
 * @param req request the user to be login
 * @param res responding with user infos or error
 */
exports.signIn = function(req, res) {
  db.User.findOne({userName: req.body.userName}).then(function(user) {
    // Checking if the password given match the resquested user pass<ord
    user.comparePassword(req.body.password, function(err, isMatch) {
      if(isMatch) {
        var token = jwt.sign({ userId: user.id, userName: user.userName }, process.env.SECRET_KEY);
        res.status(200).json({
          userId: user.id,
          userName: user.userName,
          email: user.email,
          isAdmin: user.isAdmin,
          token
          })
      } else {
        res.status(400).json({message: "Invalid Email/Password."})
      }
    })
  }).catch(function(err) {
    res.status(400).json({message: "Invalid Email/Password."})
  })
}

/**
 * Create new user
 * @param {*} req request user infos needed to register
 * @param {*} res responding with registered user infos or error
 */
exports.signUp = function(req, res) {
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

/**
 * Get single by his/her id
 * @param {*} req request id of the user to be display
 * @param {*} res responding with the user object or error
 */
exports.getUser = function(req, res) {
  db.User.find({_id: req.params.userId}).sort({ createdAt: "desc" })
  .populate("userId", {userName: true}).then(function(user) {
    res.status(200).json(user);
  }).catch(function(err) {
    res.status(500).json(err);
  })
}

/**
 * Update a user base on his/her id
 * @param {*} req request user id to be update
 * @param {*} res responding with the updated user infos or error
 */
exports.updateUser = function(req, res) {
  db.User.findOneAndUpdate({ _id: req.params.userId }, req.body, { new: true })
    .then(function(user) {
        res.json(user);
    })
    .catch(function(err) {
        res.send(err);
    });
}

/**
 * Delete a user base on his/her id
 * @param {*} req request the id of the user to be delete
 * @param {*} res responding with a confrimation message or error
 */
exports.deleteUser = function(req, res) {
  db.User.remove({_id: req.params.userId}).then(function() {
    res.json({msg: "We deleted it!"});
  }).catch(function(err) {
    res.json(err);
  })
}

module.exports = exports;