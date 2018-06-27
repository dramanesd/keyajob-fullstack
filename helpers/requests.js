var db    = require('../models');

/**
 * Create a request
 * @param {*} req get request details from body 
 * @param {*} res respond with the succes message or error
 */
exports.createRequest = function(req, res) {
  var newRequest = {
    requestEmail: req.body.requestEmail,
    subject: req.body.subject,
    requestDetail: req.body.requestDetail,
    attachment: req.body.attachment
  }

  db.Request.create(newRequest).then(function(request) {
    request.save().then(function() {
      res.status(200).json({msg: "Your has been submited!"});
    }).catch(function(err) {
        res.send(err);
      })
  }).catch(function(err) {
      res.send(err);
    })
}

/**
 * Delete a request from the database
 * @param {*} req request id of the request to be deleted
 * @param {*} res respond with confirmation message or error
 */
exports.deleteRequest = function(req, res) {
  db.Request.remove({_id: req.params.requestId}).then(function() {
    res.json({msg: "We deleted it!"});
  }).catch(function(err) {
    res.json(err);
  })
}

module.exports = exports;