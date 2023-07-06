const router = require('express').Router();

require('../modules/college/routes/college.routers')(router);

module.exports = router;
