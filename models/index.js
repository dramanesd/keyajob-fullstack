var mongoose = require("mongoose");
mongoose.set('debug', true);
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/keyajob', {
    keepAlive: true,
    reconnectTries: Number.MAX_VALUE
}); 

module.exports.User = require("./user");
module.exports.Job = require("./job");
module.exports.Category = require("./category");
module.exports.Company = require("./company");
module.exports.Favorite = require("./favorite");
module.exports.JobType = require("./jobType");
module.exports.Request = require("./request");
module.exports.Tag = require("./tag");