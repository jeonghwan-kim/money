'use strict';

var _ = require('lodash');
var Log = require('../../models').Log;

// Get list of logs
exports.index = function (req, res) {
  if (req.query.logId) {
    // find the log
    Log.find(req.query.logId).then(function (log) {
      res.json(log);
    });
  } else {
    // find all logs
    Log.findAll({
      order: 'createdAt DESC',
      limit: req.query.limit || 50,
      offset: req.query.offset || 0
    }).then(function (logs) {
      res.json(logs);
    });
  }
};

// New log
exports.create = function (req, res) {
  var userId = _.get(req, 'user.id', null);

  Log.create({
    log: req.body.log,
    UserId: userId
  }).then(function (log) {
    res.status(201).json(log);
  });
};