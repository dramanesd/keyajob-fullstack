var express   = require("express"),
    router    = express.Router({mergeParams: true}),
    helpers   = require("../helpers/auth")
    auth      = require("../middleware/auth");

router.post('/sign_in', helpers.signIn);
router.post('/sign_up', helpers.signUp);

router.get('/user/:userId', helpers.getUser);
router.put('/user/:userId',auth.loginRequired, auth.ensureCorrectUser, helpers.updateUser);
router.delete('/user/:userId',auth.loginRequired, auth.ensureCorrectUser, helpers.deleteUser);

module.exports = router;