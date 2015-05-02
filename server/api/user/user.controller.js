'use strict';

var _ = require('lodash');
var models = require('../../models');

// Get list of users
exports.index = function (req, res) {
  models.User.findAll().then(function (users) {
    res.json({users: users});
  });
};

// Create new user
exports.create = function (req, res) {
  models.User.create({
    name: req.body.name
  }).then(function (user) {
    res.json(user);
  });
};