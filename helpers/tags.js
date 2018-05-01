var db  = require('../models');

exports.createTag = function(req, res, next) {
  const newTag = {
    tagName: req.body.tagName,
    author: req.params.id
  };

  db.Tag.create(newTag).then(function(tag) {
  db.User.findById(req.params.id).then(function(user) {
    user.tags.push(tag.id)
    user.save().then(function(user) {
      return db.Tag.findById(tags._id)
      .populate("author", {userName: true})
      .exec();
    }).then(function(t) {
      return res.status(200).json(t);
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

exports.updateTag = function(req, res, next) {
  db.Tag.findByIdAndUpdate({_id: req.params.tagId}, req.body, {new: true}).then(function(tag) {
    res.json(tag);
  }).catch(function(err) {
    res.send(err);
  })
}

exports.deleteTag = function(req, res, next) {
  db.Tag.remove({_id: req.params.tagId}).then(function() {
    res.json({msg: "We deleted it!"});
  }).catch(function(err) {
    res.json(err);
  })
}


module.exports = exports;