'use strict';

var _ = require('lodash');

// Get auth info saved in session memory
exports.index = function(req, res) {
  res.json(req.user);
};

// Login
exports.login = function(req, res) {
  res.json({login: true});
};

// Logout
exports.logout = function(req, res) {
  req.logout();
  res.json({logout: true});
};



