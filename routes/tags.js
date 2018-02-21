var express     = require("express"),
    router      = express.Router({mergeParams: true}),
    helpers     = require("../helpers/tags"),
    auth        = require("../middleware/auth");

router.post('/new', helpers.createTag);
router.put('/:tagId', 
            auth.loginRequired, 
            auth.ensureCorrectUser, 
            auth.isAdmin,
            helpers.updateTag);
router.delete('/:tagId', 
            auth.loginRequired, 
            auth.ensureCorrectUser, 
            auth.isAdmin,
            helpers.deleteTag);

module.exports = router;
    