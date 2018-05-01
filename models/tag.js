var mongoose = require("mongoose");
var User = require("./job");

var tagSchema = new mongoose.Schema({
  tagName: {type: String, unique: true},
  author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
  },
  jobs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
        required: true
  }],
  createdAt: {type: Date, default: Date.now}
});

var Tag = mongoose.model('Tag', tagSchema);
module.exports = Tag;