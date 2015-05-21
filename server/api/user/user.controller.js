'use strict';

var _ = require('lodash');
var models = require('../../models');
var cryptoHelper = require('../../components/crypto-helper');

// Get list of users
exports.query = function (req, res) {
  models.User.findAll().then(function (users) {
    res.json({users: users});
  });
};

// Get the user
exports.find = function (req, res) {
  models.User.find({
    attributes: ['id', 'name', 'email', 'createdAt', 'updatedAt'],
    where: {id: req.params.uid}

  }).then(function (user) {
    res.json({user: user});

  }).catch(function (err) {
    console.error(err);
    req.status(403);
  });
};

// Create new user
exports.create = function (req, res) {
  models.User.create({
    email: req.body.email,
    pass: cryptoHelper.md5(req.body.pass),
    name: req.body.name || ''

  }).then(function (user) {
    res.json(user);

  }).catch(function (err) {
    res.status(400).json(err);
  });
};

// Update the user
exports.update = function (req, res) {
  models.User.find({
    where: {id: req.params.uid}

  }).then(function (user) {
    user.updateAttributes({
      name: req.body.name

    }).then(function (data) {
      res.json(data);

    }).catch(function (err) {
      res.status(400).json(err);
    })

  }).catch(function (err) {
    res.status(400).json(err);
  });
};