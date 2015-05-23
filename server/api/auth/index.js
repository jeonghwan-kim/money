'use strict';

var express = require('express');
var passport = require('passport');
var controller = require('./auth.controller');
var ensureAuth = require('./ensure-auth');
var Joi = require('express-joi').Joi;
var joiValidate = require('express-joi').joiValidate;
var router = express.Router();

var schema = {
  find: {
  },
  update: {
    email: Joi.types.string().email().required()
  },
  remove: {
  }
};

router.get('/', ensureAuth, controller.index);
router.post('/', passport.authenticate('local'), controller.login);
router.delete('/', ensureAuth, controller.logout);
router.put('/', joiValidate(schema.update, {strict: true}), controller.resetPassword);


module.exports = router;