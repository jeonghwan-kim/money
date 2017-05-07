'use strict';

var express = require('express');
var controller = require('./expense.controller');
var Joi = require('express-joi').Joi;
var joiValidate = require('express-joi').joiValidate;
var auth = require('../../auth/auth.service');
var router = express.Router();

var schema = {
  index: {
    year: Joi.number().integer().min(2000).optional(),
    month: Joi.number().integer().min(1).max(12).optional()
  },
  create: {
    date: Joi.string().required(),
    amount: Joi.number().integer().min(1).required(),
    text: Joi.string().required()
  },
  update: {
    id: Joi.number().integer().min(1).required(),
    date: Joi.string().required(),
    amount: Joi.number().integer().min(1).required(),
    text: Joi.string().required()
  },
  destroy: {
    id: Joi.number().integer().min(1).required()
  }
};

router.get('/', auth.isAuthenticated(), joiValidate(schema.index, {strict: false}), controller.index);
router.get('/months', auth.isAuthenticated(), controller.getMonths);
router.post('/', auth.isAuthenticated(), joiValidate(schema.create, {strict: false}), controller.create);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.put('/:id', auth.isAuthenticated(), joiValidate(schema.update, {strict: false}), controller.update);
router.delete('/:id', auth.isAuthenticated(), joiValidate(schema.destroy, {strict: false}), controller.destroy);

module.exports = router;