var db  = require('../models');

/**
 * Create tag send it id to the author object
 * @param {*} req request user object by it id
 * @param {*} res respond with tag object or error
 * @returns the tag object
 */
exports.createTag = function(req, res) {
  const newTag = {
    tagName: req.body.tagName,
    author: req.params.id
  };

  db.Tag.create(newTag).then(function(tag) {
    db.User.findById(req.params.id).then(function(user) {
      user.tags.push(tag.id);
      user.save().then(function(user) {
        return db.Tag.findById(tags._id)
        .populate("author", {userName: true})
        .exec();
      }).then(function(t) {
        return res.status(200).json(t);
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
 * Get all tags from database
 * @param {*} req 
 * @param {*} res respond with the tag object array or error
 */
exports.getAllTags = function(req, res) {
  db.Tag.find().populate("tags", {tagName: true}).exec()
    .then(function(tags) {
      res.status(200).json(tags);
    }).catch(function(err) {
        res.status(500).json(err);
      });
}

/**
 * Update a tag by it id
 * @param {*} req request id of the tag to be updated
 * @param {*} res respond with the updated tag object or error
 */
exports.updateTag = function(req, res) {
  db.Tag.findByIdAndUpdate({_id: req.params.tagId}, req.body, {new: true}).then(function(tag) {
    res.json(tag);
  }).catch(function(err) {
      res.send(err);
    });
}

/**
 * Delete a tag by it id
 * @param {*} req request id of the tag to be deleted
 * @param {*} res respond with confirmation message
 */
exports.deleteTag = function(req, res) {
  db.Tag.remove({_id: req.params.tagId}).then(function() {
    res.json({msg: "We deleted it!"});
  }).catch(function(err) {
      res.json(err);
    });
}

module.exports = exports;