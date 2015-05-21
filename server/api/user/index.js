'use strict';

var express = require('express');
var controller = require('./user.controller');
var Joi = require('express-joi').Joi;
var joiValidate = require('express-joi').joiValidate;

var router = express.Router();

var schema = {
  find: {
    uid: Joi.types.Number().required()
  },
  update: {
    uid: Joi.types.Number().required(),
    name: Joi.types.String().required()
  }
};

router.get('/', controller.query);
router.get('/:uid', joiValidate(schema.find, {strict: true}), controller.find);
router.post('/', controller.create);
router.put('/:uid', joiValidate(schema.update, {strict: true}), controller.update);


module.exports = router;