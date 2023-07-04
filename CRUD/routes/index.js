const router = require('express').Router();

require('../modules/user/routes/user.routers')(router);
require('../modules/message/routes/message.routers')(router);

module.exports = router;
