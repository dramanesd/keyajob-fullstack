var mongoose = require("mongoose");

var requestSchema = new mongoose.Schema({
  requestEmail: {type: String, required: true},
  subject: {type: String, required: true},
  requestDetail: {type: String, required: true},
  attachment: {type: String},
  createdat: {type: Date, default: Date.now}
});

var Request = mongoose.model('Request', requestSchema);
module.exports = Request;