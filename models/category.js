var mongoose = require("mongoose");
var User = require("./user");

var categorySchema = new mongoose.Schema({
  categoryName: {type: String, unique: true},
  userId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
  }],
  jobId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
        required: true
  }],
  createdAt: {type: Date, default: Date.now}
});

var Category = mongoose.model('Category', categorySchema);
module.exports = Category;