var db    = require('../models');

/**
 * Create job, send it id to the  category and the  company object
 * @param {*} req request the job details from the body
 * @param {*} res responding with the new job details or error
 * @returns the job object
 */
exports.createJob = function(req, res) {
  // request user to be passed as author
  db.User.findById(req.params.id).then(function(user) {
    // Body object
    var newJob = {
      title: req.body.title,
      description: req.body.description,
      author: {
        id: user.id,
        userName: user.userName
      },
      applicationLink: req.body.applicationLink,
      company: req.body.company,
      category: req.body.category,
      jobType: req.body.jobType,
      tags: req.body.tags
    }
    
    // Create the job
    db.Job.create(newJob).then(function(job) {
      db.User.findById(req.params.id).then(function(user) {
        user.jobs.push(job._id);
        user.save().then(function(user) {
          return db.Job.findById(job._id)
          .populate("user", { username: true })
          .populate("category", {categoryName: true})
          .populate("tags", {tagName: true})
          .populate("jobType", {jobTypeName: true})
          .populate("company", {companyName: true, companyLogo: true})
          .exec();
        }).then(function(j) {
          // Send job id to the category object
          db.Category.findOne(j.category)
          .then(function(category) {
            category.jobs.push(j._id)
            category.save()
          })
          
          // Send job id to the company object
          db.Company.findOne(j.company)
          .then(function(company) {
            company.jobs.push(j._id)
            company.save()
          })

          return res.status(200).json(j);
        }).catch(function(err) {
            res.send(err)
          });
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

/**
 * Get all jobs in the database
 * @param {*} req 
 * @param {*} res responding with the array of job objects or error
 */
exports.getAllJobs = function(req, res) {
  db.Job.find().sort({ createdAt: "desc" })
    .populate("userId", {userName: true})
    .populate("category", {categoryName: true})
    .populate("tags", {tagName: true})
    .populate("jobType", {jobTypeName: true})
    .populate("company", {companyName: true, companyLogo: true})
    .exec()
    .then(function(jobs) {
      res.status(200).json(jobs);
    }).catch(function(err) {
        res.status(500).json(err);
      })
}

/**
 * Get a single job by it id
 * @param {*} req request id of trhe job to be displayed
 * @param {*} res responding with the job object or error
 */
exports.getSingleJob = function(req, res) {
  db.Job.find({_id: req.params.jobId}).sort({ createdAt: "desc" })
    .populate("userId", {userName: true})
    .populate("category", {categoryName: true})
    .populate("tags", {tagName: true})
    .populate("jobType", {jobTypeName: true})
    .populate("company", {companyName: true, companyWebsite: true, facebookUrl: true, twitterUrl: true, linkedinUrl: true, companyLogo: true})
    .exec()
    .then(function(job) {
      res.status(200).json(job);
    }).catch(function(err) {
        res.status(500).json(err);
      })
}

/**
 * Update a job
 * @param {*} req request id of the job to be updated
 * @param {*} res responding with the updated job degtails or error
 */
exports.updateJob = function(req, res) {
  db.Job.findByIdAndUpdate({_id: req.params.jobId}, req.body, {new: true}).then(function(job) {
    res.json(job);
  }).catch(function(err) {
      res.send(err);
    })
}

/**
 * Delete a one job
 * @param {*} req request id of the job to be deleted
 * @param {*} res responding with the confirmation message or error
 */
exports.deleteJob = function(req, res) {
  db.Job.remove({_id: req.params.jobId}).then(function() {
    res.json({msg: "We deleted it!"});
  }).catch(function(err) {
      res.json(err);
    })
}

module.exports = exports;