var express   = require("express"),
    router    = express.Router({mergeParams: true}),
    helpers   = require("../helpers/companies")
    auth      = require("../middleware/auth");

router.get('/user/:id/companies', helpers.getAllCompanies)

router.post('/user/:id/companies/new', auth.loginRequired, auth.ensureCorrectUser, helpers.createCompany);
router.put('/user/:id/companies/:companyId', 
            auth.loginRequired, 
            auth.ensureCorrectUser,
            auth.companyOwnership,
            helpers.updateCompany);
router.delete('/user/:id/companies/:companyId', 
            auth.loginRequired, 
            auth.ensureCorrectUser,
            auth.companyOwnership,  
            helpers.deleteCompany);

module.exports = router;