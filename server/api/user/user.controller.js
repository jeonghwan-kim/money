'use strict';

var _ = require('lodash');
var models = require('../../models');
var cryptoHelper = require('../../components/crypto-helper');

// Get list of users
exports.index = function (req, res) {
  models.User.findAll().then(function (users) {
    res.json({users: users});
  });
};

// Create new user
exports.create = function (req, res) {
  models.User.create({
    email: req.body.email,
    pass: cryptoHelper.md5(req.body.pass)

  }).then(function (user) {
    res.json(user);

  }).catch(function (err) {
    res.json(err);
  });
};