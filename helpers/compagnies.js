var db = require("../models");

exports.createCompagny = function(req, res) {
  db.User.findById(req.params.id).then(function(user) {
    const newCompagny = {
    compagnyName: req.body.compagnyName,
    compagnyWebsite: req.body.compagnyWebsite,
    facebookUrl: req.body.facebookUrl,
    twitterUrl: req.body.twitterUrl,
    linkedinUrl: req.body.linkedinUrl,
    compagnyLogo: req.body.compagnyLogo,
    author: {
      id: user.id,
      userName: user.userName
    }
  }

  db.Compagny.create(newCompagny).then(function(compagny) {
    db.User.findById(req.params.id).then(function(user) {
        user.compagnies.push(compagny._id)
        user.save().then(function(user) {
                return db.Compagny.findById(compagny._id)
                    .populate("userId", { username: true })
            }).then(function(c) {
                return res.status(200).json(c);
            }).catch(function(err) {
              res.send(err)
              });
      }).catch(function(err) {
            res.send(err)
        })
  }).catch(function(err) {
    res.send(err);
  })
  }).catch(function(err) {
    res.send(err);
  })
}

exports.updateCompagny = function(req, res) {
  db.Compagny.findByIdAndUpdate({_id: req.params.compagnyId}, req.body, {new: true}).then(function(compagny) {
    res.json(compagny);
  }).catch(function(err) {
    res.send(err);
  })
}

exports.deleteCompagny = function(req, res) {
  db.Compagny.remove({_id: req.params.compagnyId}).then(function() {
    res.json({msg: "We deleted it!"});
  }).catch(function(err) {
    res.json(err);
  })
}

module.exports = exports;