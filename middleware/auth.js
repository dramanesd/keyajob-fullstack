require('dotenv').load()
var jwt = require("jsonwebtoken"),
    db  = require('../models');

exports.loginRequired = function(req, res, next) {
    try {
        var token = req.headers.authorization.split(" ")[1]
        jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
            if (decoded) {
                next();
            } else {
                res.status(401).json({ message: 'Please log in first' })
            }
        });
    } catch (e) {
        res.status(401).json({ message: 'Please log in first' })
    }
}

exports.ensureCorrectUser = function(req, res, next) {
    try {
        var token = req.headers.authorization.split(" ")[1]
        jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
            if (decoded && decoded.userId === req.params.id) {
                next();
            } else {
                res.status(401).json({ message: 'Unauthorized' })
            }
        });
    } catch (e) {
        res.status(401).json({ message: 'Unauthorized' })
    }
}

exports.jobOwnership = function(req, res, next) {
  db.Job.findById({_id: req.params.jobId}).then(function(foundJob) {
    db.User.findById({_id: req.params.id}).then(function(user) {
        if(foundJob && foundJob.author.id.equals(user._id)) {
            next();
        } else {
            res.json({msg: "You don't have permission to do that!"});
        }  
    }).catch(function(err) {
      res.send(err);
    })
  }).catch(function(err){
    res.json({msg: "Some went wrong! " + " " + err});
  })
}

exports.compagnyOwnership = function(req, res, next) {
  db.Compagny.findById({_id: req.params.compagnyId}).then(function(foundCompagny) {
    db.User.findById({_id: req.params.id}).then(function(user) {
        if(foundCompagny && foundCompagny.author.id.equals(user._id)) {
            next();
        } else {
            res.json({msg: "You don't have permission to do that!"});
        }  
    }).catch(function(err) {
      res.send(err);
    })
  }).catch(function(err){
    res.json({msg: "Some went wrong! " + " " + err});
  })
}

exports.isAdmin = function(req, res, next) {
  db.User.findById({ _id: req.params.id }).then(function(user) {
      try {
          if (user.isAdmin === true) {
              next();
          } else {
              res.status(401).json({ message: 'You must have Admin status to do that!' });
          }
      } catch (e) {
          res.status(401).json({ message: 'You must have Admin status to do that!' });
      } 
  }).catch(function(err) {
      res.send(err);
    })
}

module.exports = exports;