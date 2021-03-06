var mongoose = require("mongoose");
mongoose.set('debug', true);
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB, {
    keepAlive: true,
    reconnectTries: Number.MAX_VALUE,
    useNewUrlParser: true,
    useUnifiedTopology: true
});  // 'mongodb://localhost/keyajob'

module.exports.User = require("./user");
module.exports.Job = require("./job");
module.exports.Category = require("./category");
module.exports.Company = require("./company");
module.exports.Favorite = require("./favorite");
module.exports.JobType = require("./jobType");
module.exports.Request = require("./request");
module.exports.Tag = require("./tag");