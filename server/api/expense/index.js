'use strict';

var express = require('express');
var controller = require('./expense.controller');
var ensureAuth = require('../auth/ensure-auth');
var Joi = require('express-joi').Joi;
var joiValidate = require('express-joi').joiValidate;
var router = express.Router();

var schema = {
  find: {
    year: Joi.number().integer().min(2000).optional(),
    month: Joi.number().integer().min(1).max(12).optional()
  },
  create: {
    amount: Joi.number().integer().min(1).required(),
    text: Joi.string().required(),
    date: Joi.string().regex(/^\d{4}-\d{2}-\d{2}$/).required()
  },
  update: {},
  remove: {}
};


router.get('/', joiValidate(schema.find, {strict: true}), ensureAuth, controller.query);
router.post('/', joiValidate(schema.create, {strict: true}), controller.create);
router.put('/', ensureAuth, controller.update);
router.delete('/', ensureAuth, controller.remove);

module.exports = router;