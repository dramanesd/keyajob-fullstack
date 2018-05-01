var db = require("../models");

exports.createCompany = function(req, res) {
  db.User.findById(req.params.id).then(function(user) {
    const newCompany = {
    companyName: req.body.companyName,
    companyWebsite: req.body.companyWebsite,
    facebookUrl: req.body.facebookUrl,
    twitterUrl: req.body.twitterUrl,
    linkedinUrl: req.body.linkedinUrl,
    companyLogo: req.body.companyLogo,
    author: {
      id: user.id,
      userName: user.userName
    }
  }

  db.Company.create(newCompany).then(function(company) {
    db.User.findById(req.params.id).then(function(user) {
        user.companies.push(company._id)
        user.save().then(function(user) {
                return db.Company.findById(company._id)
                    .populate("author", { username: true }).exec();
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

exports.updateCompany = function(req, res) {
  db.Company.findByIdAndUpdate({_id: req.params.companyId}, req.body, {new: true}).then(function(company) {
    res.json(company);
  }).catch(function(err) {
    res.send(err);
  })
}

exports.deleteCompany = function(req, res) {
  db.Company.remove({_id: req.params.companyId}).then(function() {
    res.json({msg: "We deleted it!"});
  }).catch(function(err) {
    res.json(err);
  })
}

module.exports = exports;