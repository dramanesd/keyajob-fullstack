var express   = require("express"),
    router    = express.Router({mergeParams: true}),
    helpers   = require("../helpers/categories"),
    auth      = require("../middleware/auth");

router.get('/categories', helpers.getAllCategories);

router.post('/user/:id/categories/new', 
            auth.loginRequired, 
            auth.ensureCorrectUser, 
            auth.isAdmin,
            helpers.createCategory);
router.put('/user/:id/categories/:categoryId', 
            auth.loginRequired, 
            auth.ensureCorrectUser, 
            auth.isAdmin, 
            helpers.updateCategory);
router.delete('/user/:id/categories/:categoryId', 
            auth.loginRequired, 
            auth.ensureCorrectUser, 
            auth.isAdmin, 
            helpers.deleteCategory);

module.exports = router;