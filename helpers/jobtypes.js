var   db = require('../models');

/**
 * Create Job Type and send it id to the author object
 * @param {*} req request jobType details from the body
 * @param {*} res respond with the jobType details or error
 * @returns the jobType obejct
 */
exports.createJobType = function(req, res) {
  const newjobType = {
    jobTypeName: req.body.jobTypeName,
    author: req.params.id
  };

  db.JobType.create(newjobType).then(function(jobType) {
    db.User.findById(req.params.id).then(function(user) {
      user.jobtypes.push(jobType.id);
      user.save().then(function(user) {
        return db.JobType.findById(jobtypes._id)
        .populate("author", {userName: true}).exec();
      }).then(function(jobType) {
          return res.status(200).json(jobType);
        }).catch(function(err) {
            res.send(err)
          });
    }).catch(function(err) {
        res.send(err)
      });
  }).catch(function(err) {
        res.send(err)
    });
}

/**
 * Get all Job Types in the database
 * @param {*} req 
 * @param {*} res responding with the jobType objects array or error
 */
exports.findAllJobTypes = function(req, res) {
  db.JobType.find().populate("jobType", {jobTypeName: true}).exec()
    .then(function(jobTypes) {
      res.status(200).json(jobTypes);
    }).catch(function(err) {
        res.status(500).json(err);
      });
}

/**
 * Update a Job Type
 * @param {*} req request id of the jobType to be updated 
 * @param {*} res respond with the updated jobType object or error 
 */
exports.updateJobType = function(req, res) {
  db.JobType.findByIdAndUpdate({_id: req.params.jobTypeId}, req.body, {new: true}).then(function(jobType) {
    res.json(jobType);
  }).catch(function(err) {
      res.send(err);
    })
}

/**
 * Delete a Job Type by it id
 * @param {*} req request the id of jobType to be deleted
 * @param {*} res respond with confirmation message or error
 */
exports.deleteJobType = function(req, res) {
  db.JobType.remove({_id: req.params.jobTypeId}).then(function() {
    res.json({msg: "We deleted it!"});
  }).catch(function(err) {
      res.json(err);
    })
}

module.exports = exports;