'use strict';

var _ = require('lodash');
var Log = require('../../models').Log;

// Get list of logs
exports.query = function (req, res) {
  if (req.query.logId) {
    // find the log
    Log.find(req.query.logId).then(function (log) {
      res.json({log: log});
    });
  } else {
    // find all logs
    Log.findAll({
      limit: req.query.limit || 50,
      offset: req.query.offset || 0
    }).then(function (logs) {
      res.json({logs: logs});
    });
  }
};

// New log
exports.create = function (req, res) {
  Log.create({
    log: req.body.log,
    UserId: req.user.user.id
  }).then(function (log) {
    res.status(201).json({insertedLog: log});
  });
};