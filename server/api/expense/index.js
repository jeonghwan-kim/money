'use strict';

var express = require('express');
var controller = require('./expense.controller');
var ensureAuth = require('../auth/ensure-auth');

var router = express.Router();

router.get('/', ensureAuth, controller.query);
router.post('/', ensureAuth, controller.create);

module.exports = router;