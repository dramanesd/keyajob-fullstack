var express   = require("express"),
    router    = express.Router({mergeParams: true}),
    helpers   = require("../helpers/categories"),
    auth      = require("../middleware/auth");

router.post('/new', 
            auth.loginRequired, 
            auth.ensureCorrectUser, 
            auth.isAdmin,
            helpers.createCategory);
router.put('/:categoryId', 
            auth.loginRequired, 
            auth.ensureCorrectUser, 
            auth.isAdmin, 
            helpers.updateCategory);
router.delete('/:categoryId', 
            auth.loginRequired, 
            auth.ensureCorrectUser, 
            auth.isAdmin, 
            helpers.deleteCategory);

module.exports = router;