const router = require('express').Router();
const controller = require('./theaters.controller.js');

router.route('/').get(controller.list)

module.exports = router;