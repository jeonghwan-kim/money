'use strict';

var express = require('express');
var controller = require('./user.controller');
var Joi = require('express-joi').Joi;
var joiValidate = require('express-joi').joiValidate;
var router = express.Router();
var auth = require('../../auth/auth.service');
var schema = {
  update: {
    name: Joi.types.String().optional(),
    password: Joi.types.String().optional()
  }
};

router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/me/profile', auth.isAuthenticated(), joiValidate(schema.update, {struct: false}), controller.update);
router.get('/', auth.hasRole('admin'), controller.index);
router.post('/', controller.create);
router.delete('/', auth.hasRole('admin'), controller.remove);


module.exports = router;