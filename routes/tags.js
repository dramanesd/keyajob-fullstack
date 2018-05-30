var express     = require("express"),
    router      = express.Router({mergeParams: true}),
    helpers     = require("../helpers/tags"),
    auth        = require("../middleware/auth");

router.get('/tags', helpers.getAllTags);

router.post('/user/:id/tags/new', 
            auth.loginRequired, 
            auth.ensureCorrectUser, 
            auth.isAdmin,
            helpers.createTag);
router.put('/user/:id/tags/:tagId', 
            auth.loginRequired, 
            auth.ensureCorrectUser, 
            auth.isAdmin,
            helpers.updateTag);
router.delete('/user/:id/tags/:tagId', 
            auth.loginRequired, 
            auth.ensureCorrectUser, 
            auth.isAdmin,
            helpers.deleteTag);

module.exports = router;
    