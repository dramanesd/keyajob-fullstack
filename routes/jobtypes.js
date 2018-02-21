var express   = require("express"),
    router    = express.Router({mergeParams: true}),
    helpers   = require("../helpers/jobtypes"),
    auth      = require("../middleware/auth");
    
router.post('/new', helpers.createJobType);
router.put('/:jobTypeId', 
            auth.loginRequired, 
            auth.ensureCorrectUser, 
            auth.isAdmin,
            helpers.updateJobType);
router.delete('/:jobTypeId', 
            auth.loginRequired, 
            auth.ensureCorrectUser, 
            auth.isAdmin,
            helpers.deleteJobType);

module.exports = router;