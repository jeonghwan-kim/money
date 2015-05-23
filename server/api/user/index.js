'use strict';

var express = require('express');
var controller = require('./user.controller');
var Joi = require('express-joi').Joi;
var joiValidate = require('express-joi').joiValidate;
var ensureAuth = require('../../components/ensure-auth');
var router = express.Router();

var schema = {
  find: {
  },
  update: {
    name: Joi.types.String().optional(),
    password: Joi.types.String().optional()
  },
  remove: {
  }
};

//router.get('/', controller.query);
router.get('/', ensureAuth, joiValidate(schema.find, {strict: true}), controller.find);
router.post('/', controller.create);
router.put('/', ensureAuth, joiValidate(schema.update, {strict: true}), controller.update);
router.delete('/', ensureAuth, joiValidate(schema.remove, {strict: true}), controller.remove);

module.exports = router;