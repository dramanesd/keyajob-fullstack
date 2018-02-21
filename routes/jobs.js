var express     = require("express"),
    router      = express.Router({mergeParams: true}),
    helpers     = require("../helpers/jobs"),
    auth        = require("../middleware/auth");

router.post('/new', auth.loginRequired, auth.ensureCorrectUser, helpers.createJob);
router.put('/:jobId',
            auth.loginRequired, 
            auth.ensureCorrectUser, 
            auth.jobOwnership,
            helpers.updateJob);
router.delete('/:jobId',
            auth.loginRequired, 
            auth.ensureCorrectUser,
            auth.jobOwnership,
            helpers.deleteJob);

module.exports = router; 