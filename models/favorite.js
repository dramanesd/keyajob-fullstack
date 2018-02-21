var   mongoose    = require("mongoose"),
      User        = require("./user"),
      User        = require("./job");

var favoriteSchema = new mongoose.Schema({
  favor: {type: Boolean, default: false},
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

var Favorite = mongoose.model('Favorite', favoriteSchema);
module.exports = Favorite;