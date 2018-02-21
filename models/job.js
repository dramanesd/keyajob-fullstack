var mongoose = require("mongoose");
var User = require("./user");
var User = require("./compagny");
var User = require("./category");
var User = require("./jobType");
var User = require("./tag");
var User = require("./favorite");

var jobSchema = new mongoose.Schema({
  title: {type: String, required: true},
  description: {type: String, required: true},
  applicationLink: {type: String, required: true},
  author: {
        id: {type: mongoose.Schema.Types.ObjectId},
        userName: String
  },
  compagny: {
        id: mongoose.Schema.Types.ObjectId,
        compagnyName: {type: String, required: true},
        CompagnyWebsite: {type: String},
        facebookUrl: {type: String},
        twitterUrl: {type: String},
        linkedinUrl: {type: String},
        compagnyLogo: {type: String}
},
  categoryId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
  }],
  jobTypeId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "JobType",
        required: true
  }],
  tagId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
        required: true
  }],
  favoriteId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "favorite",
        required: true
  }],
  createdAt: {type: Date, default: Date.now}
});

var Job = mongoose.model('Job', jobSchema);
module.exports = Job;