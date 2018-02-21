var db    = require("../models");

exports.getAllCategories = function(req, res, next) {
  db.Category.find(function(err, allCategories) {
    if(err) {
      console.log(err);
    } else {
      res.render("../views/dashboard", {categories: allCategories, page: 'dashboard'});
    }
  });
}

exports.getAllJobTypes = function(req, res, next) {
  db.JobType.find(function(err, allJobTypes) {
    if(err) {
      console.log(err);
    } else {
      res.render("../views/dashboard", {jobtypes: allJobTypes, page: 'dashboard'});
    }
  });
 }


 
module.exports = exports;