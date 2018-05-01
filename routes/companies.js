var express   = require("express"),
    router    = express.Router({mergeParams: true}),
    helpers   = require("../helpers/companies")
    auth      = require("../middleware/auth");

router.post('/new', auth.loginRequired, auth.ensureCorrectUser, helpers.createCompany);
router.put('/:companyId', 
            auth.loginRequired, 
            auth.ensureCorrectUser,
            auth.companyOwnership,
            helpers.updateCompany);
router.delete('/:companyId', 
            auth.loginRequired, 
            auth.ensureCorrectUser,
            auth.companyOwnership,  
            helpers.deleteCompany);

module.exports = router;