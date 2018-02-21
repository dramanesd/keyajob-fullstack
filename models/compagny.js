var mongoose = require("mongoose");
var User = require("./user");
var User = require("./job");

var compagnySchema = new mongoose.Schema({
  compagnyName: {type: String, required: true},
  compagnyWebsite: {type: String},
  facebookUrl: {type: String},
  twitterUrl: {type: String},
  linkedinUrl: {type: String},
  compagnyLogo: {type: String},
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

var Compagny = mongoose.model('Compagny', compagnySchema);
module.exports = Compagny;