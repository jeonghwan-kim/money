'use strict';

var express = require('express');
var passport = require('passport');
var controller = require('./auth.controller');
var ensureAuth = require('./ensure-auth');

var router = express.Router();

router.get('/', ensureAuth, controller.index);
router.post('/', passport.authenticate('local'), controller.login);
router.delete('/', ensureAuth, controller.logout);

module.exports = router;