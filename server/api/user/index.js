'use strict';

var express = require('express');
var controller = require('./user.controller');
var Joi = require('express-joi').Joi;
var joiValidate = require('express-joi').joiValidate;

var router = express.Router();

var schema = {
  uid: Joi.types.Number().required()
};

router.get('/', controller.query);
router.get('/:uid', joiValidate(schema, {strict: true}), controller.find);
router.post('/', controller.create);


module.exports = router;