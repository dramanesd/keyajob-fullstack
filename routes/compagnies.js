var express   = require("express"),
    router    = express.Router({mergeParams: true}),
    helpers   = require("../helpers/compagnies")
    auth      = require("../middleware/auth");

router.post('/new', auth.loginRequired, auth.ensureCorrectUser, helpers.createCompagny);
router.put('/:compagnyId', 
            auth.loginRequired, 
            auth.ensureCorrectUser,
            auth.compagnyOwnership,
            helpers.updateCompagny);
router.delete('/:compagnyId', 
            auth.loginRequired, 
            auth.ensureCorrectUser,
            auth.compagnyOwnership,  
            helpers.deleteCompagny);

module.exports = router;