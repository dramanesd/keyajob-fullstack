var mongoose = require("mongoose");
var User = require("./user");
var Job = require("./job");

var companySchema = new mongoose.Schema({
  companyName: {type: String, required: true},
  companyWebsite: {type: String},
  facebookUrl: {type: String},
  twitterUrl: {type: String},
  linkedinUrl: {type: String},
  compagyLogo: {type: String},
  author: {
        id: {type: mongoose.Schema.Types.ObjectId},
        userName: String
  },
  jobs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
        required: true
  }],
  createdAT: {type: Date, default: Date.now}
});

var Company = mongoose.model('Company', companySchema);
module.exports = Company;