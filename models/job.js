var mongoose = require("mongoose");
var User = require("./user");
var Company = require("./company");
var Category = require("./category");
var JobType = require("./jobType");
var Tag = require("./tag");
var Favorite = require("./favorite");

var ObjectId = mongoose.Schema.Types.ObjectId;

var jobSchema = new mongoose.Schema({
  title: {type: String, required: true},
  description: {type: String, required: true},
  applicationLink: {type: String, required: true},
  author: {
        id: {type: mongoose.Schema.Types.ObjectId},
        userName: String
  },
  company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
        required: true
  },
  category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
  },
  jobType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "JobType",
        required: true
  },
  tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
        required: true
      }],
  createdAt: {type: Date, default: Date.now}
});

var Job = mongoose.model('Job', jobSchema);
module.exports = Job;