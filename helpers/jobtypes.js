var   db = require('../models');

exports.createJobType = function(req, res, next) {
  const newjobType = {
    jobTypeName: req.body.jobTypeName,
    author: req.params.id
  };

  db.JobType.create(newjobType).then(function(jobType) {
  db.User.findById(req.params.id).then(function(user) {
    user.jobtypes.push(jobType.id)
    user.save().then(function(user) {
      return db.JobType.findById(jobtypes._id)
      .populate("author", {userName: true}).exec();
    }).then(function(jobType) {
      return res.status(200).json(jobType);
    }).catch(function(err) {
      res.send(err)
    })
  }).catch(function(err) {
      res.send(err)
    })
}).catch(function(err) {
      res.send(err)
  })
}

exports.findAllJobTypes = function(req, res, next) {
  db.JobType.find().populate("jobType", {jobTypeName: true}).exec()
    .then(function(jobTypes) {
      res.status(200).json(jobTypes);
    }).catch(function(err) {
      res.status(500).json(err);
    });
}

exports.updateJobType = function(req, res, next) {
  db.JobType.findByIdAndUpdate({_id: req.params.jobTypeId}, req.body, {new: true}).then(function(jobType) {
    res.json(jobType);
  }).catch(function(err) {
    res.send(err);
  })
}

exports.deleteJobType = function(req, res, next) {
  db.JobType.remove({_id: req.params.jobTypeId}).then(function() {
    res.json({msg: "We deleted it!"});
  }).catch(function(err) {
    res.json(err);
  })
}

module.exports = exports;