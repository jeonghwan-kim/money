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
    where: {id: req.user.user.id}

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
  var updateValues = {
    name: req.body.name,
    pass: cryptoHelper.md5(req.body.password)
  };
  updateValues = _.omit(updateValues, function (value, key, list) {
    return value === undefined;
  });
  if (_.isEmpty(updateValues)) {
    return res.status(400).send();
  }

  models.User.find({where: {id: req.user.user.id}}).then(function (user) {
    user.updateAttributes(updateValues).then(function (data) {
      req.session.destroy();
      res.json(data);
    }).catch(function (err) {
      res.status(400).json(err);
    })
  }).catch(function (err) {
    res.status(400).json(err);
  });
};

// Remove user
exports.remove = function (req, res) {
  var uid = req.user.user.id;

  models.User.destroy({where: {id: uid}}).then(function (affectedRows) {
    if (affectedRows) {
      req.session.destroy();
      res.json('userId: ' + uid + ' is removed');
    } else {
      res.status(404).json();
    }
  });
};