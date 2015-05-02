'use strict';

var express = require('express');
var passport = require('passport');
var controller = require('./auth.controller');

var router = express.Router();

router.get('/', controller.index);
router.post('/', passport.authenticate('local'), controller.login);
router.delete('/', controller.logout);

module.exports = router;