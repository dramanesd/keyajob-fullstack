var mongoose    = require("mongoose");
    bcrypt      = require("bcryptjs"),
    Job         = require("./job"),
    Compagny    = require("./compagny"),
    Favorite    = require("./favorite");

var userSchema = new mongoose.Schema({
  userName: {type: String, required: true, unique: true},
  password: {type: String, required: true },
  email: {type: String, required: true, unique: true},
  firstName: {type: String},
  lastName: {type: String},
  isAdmin: {type: Boolean, default: false}, 
  jobs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
        required: true
  }],
  compagnies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Compagny",
        required: true
  }],
  favoriteId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Favorite",
        required: true
  }],
  createdAt: {type: Date, default: Date.now}
});

userSchema.pre('save', function(next) {
    var user = this;
    if (!user.isModified('password')) return next();
    bcrypt.hash(user.password, 10).then(function(hashedPassword) {
        user.password = hashedPassword
        next();
    }, function(err) {
        return next(err)
    });
});

userSchema.methods.comparePassword = function(candidatePassword, next) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return next(err);
        next(null, isMatch);
    });
};

var User = mongoose.model('User', userSchema);
module.exports = User;