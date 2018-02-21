var db    = require("../models");

exports.createRequest = function(req, res, next) {
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

exports.deleteRequest = function(req, res, next) {
  db.Request.remove({_id: req.params.requestId}).then(function() {
    res.json({msg: "We deleted it!"});
  }).catch(function(err) {
    res.json(err);
  })
}

module.exports = exports;