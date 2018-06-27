var db = require('../models');

/**
 * Create company and link to it author
 * @param {*} req request details from the body
 * @param {*} res responding with the new company details or error
 * @returns the company object
 */
exports.createCompany = function(req, res) {
  db.User.findById(req.params.id).then(function(user) {
    // Body object to be passed
    var newCompany = {
      companyName: req.body.companyName,
      companyWebsite: req.body.companyWebsite,
      facebookUrl: req.body.facebookUrl,
      twitterUrl: req.body.twitterUrl,
      linkedinUrl: req.body.linkedinUrl,
      companyLogo: req.body.companyLogo,
      author: {
        id: user._id,
        userName: user.userName
      }
    }

    // Create company
    db.Company.create(newCompany).then(function(company) {
      db.User.findById(req.params.id).then(function(user) {
        user.companies.push(company._id);
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

/**
 * Get all companies of a given user
 * @param {*} req request id of the targeted user
 * @param {*} res responding with all companies of the found user or error
 */
exports.getAllCompanies = function(req, res) {
  db.User.findById(req.params.id).then(function(user) {
    db.Company.find().where("author.id").equals(user._id).exec()
      // .populate("company", {companyName: true}).exec()
      .then(function(companies) {
        res.status(200).json(companies);
      }).catch(function(err) {
          res.status(500).json(err);
        });
  }).catch(function(err) {
      res.send(err)
    })
}

/**
 * Update company base on it id
 * @param {*} req request id of the comapny to be updated
 * @param {*} res responding with the updated company or error
 */
exports.updateCompany = function(req, res) {
  db.Company.findByIdAndUpdate({_id: req.params.companyId}, req.body, {new: true}).then(function(company) {
    res.json(company);
  }).catch(function(err) {
      res.send(err);
    })
}

/**
 * Delete a company 
 * @param {*} req request the id of company to be deleted
 * @param {*} res responding with a confirmation message or error
 */
exports.deleteCompany = function(req, res) {
  db.Company.remove({_id: req.params.companyId}).then(function() {
    res.json({msg: "We deleted it!"});
  }).catch(function(err) {
      res.json(err);
    })
}

module.exports = exports;