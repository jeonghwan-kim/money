'use strict';

var express = require('express');
var passport = require('passport');
var config = require('../config/environment');
var models = require('../models');
var router = express.Router();

require('./local/passport').setup(models.User);

router.use('/local', require('./local'));

module.exports = router;