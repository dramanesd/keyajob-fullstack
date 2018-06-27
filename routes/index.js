var express   = require("express"),
    router    = express.Router({mergeParams: true}),
    db        = require("../models"),
    helpers   = require("../helpers/dashboard"),
    helpers   = require("../helpers/jobs");

router.get("/", function(req, res) {
  
  res.render("../index");
});

router.get('/api/jobs', helpers.getAllJobs);
router.get('/api/jobs/:jobId', helpers.getSingleJob);

// router.get("/dashboard", helpers.getAllCategories);
// router.get("/dashboard", helpers.getAllJobTypes);

module.exports = router;