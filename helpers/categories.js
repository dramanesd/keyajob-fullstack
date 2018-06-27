var db    = require('../models');

/**
 * Create category and link to it author
 * @param {*} req request the category name and the author id
 * @param {*} res responding with new category details or error
 * @returns the category object
 */
exports.createCategory = function(req, res) {
  const newCategory = {
    categoryName: req.body.categoryName,
    author: req.params.id
  };

  db.Category.create(newCategory).then(function(category) {
    db.User.findById(req.params.id).then(function(user) {
      user.categories.push(category.id);
      user.save().then(function(user) {
        return db.Category.findById(categories._id)
        .populate("author", {userName: true}).exec();
      }).then(function(c) {
        return res.status(200).json(c);
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
 * Get all categories with aggregations and perform count category related jobs
 * @param {*} req 
 * @param {*} res responding with all categories and there details or error
 */
exports.getAllCategories = function(req, res) {
  db.Category.aggregate(
    [
      {
        $project: {
          categoryName: 1,
          numberOfJobs: { $size: "$jobs" }
        }
      }
    ]
  ).then(function(categories) {
    res.status(200).json(categories);
  }).catch(function(err) {
    res.status(500).json(err);
  });
}

/**
 * Finding one category and update it
 * @param {*} req request id of the category to be update
 * @param {*} res responding with updated category or error
 */
exports.updateCategory = function(req, res) {
  db.Category.findByIdAndUpdate({_id: req.params.categoryId}, req.body, {new: true}).then(function(category) {
    res.json(category);
  }).catch(function(err) {
    res.send(err);
  })
}

/**
 * Delete a category
 * @param {*} req request id of the category to be delete 
 * @param {*} res responding with a confrimation message or error
 */
exports.deleteCategory = function(req, res) {
  db.Category.remove({_id: req.params.categoryId}).then(function() {
    res.json({msg: "We deleted it!"});
  }).catch(function(err) {
    res.json(err);
  })
}

module.exports = exports;