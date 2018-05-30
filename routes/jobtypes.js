var express   = require("express"),
    router    = express.Router({mergeParams: true}),
    helpers   = require("../helpers/jobtypes"),
    auth      = require("../middleware/auth");

router.get('/jobtypes', helpers.findAllJobTypes);

router.post('/user/:id/jobtypes/new', 
            auth.loginRequired, 
            auth.ensureCorrectUser, 
            auth.isAdmin,
            helpers.createJobType);
router.put('/user/:id/jobtypes/:jobTypeId', 
            auth.loginRequired, 
            auth.ensureCorrectUser, 
            auth.isAdmin,
            helpers.updateJobType);
router.delete('/user/:id/jobtypes/:jobTypeId', 
            auth.loginRequired, 
            auth.ensureCorrectUser, 
            auth.isAdmin,
            helpers.deleteJobType);

module.exports = router;