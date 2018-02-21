var express     = require("express"),
    router      = express.Router({mergeParams: true}),
    helpers     = require("../helpers/requests");

router.post('/new', helpers.createRequest);
router.delete('/:requestId', helpers.deleteRequest);

module.exports = router;