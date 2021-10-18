const router = require('express').Router();
const controller = require('./movies.controller');

router.route('/').get(controller.list)

module.exports = router;