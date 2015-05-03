'use strict';

var express = require('express');
var controller = require('./log.controller');
var ensureAuth = require('../auth/ensure-auth');

var router = express.Router();

router.get('/', controller.query);
router.post('/', controller.create);

module.exports = router;