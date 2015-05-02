'use strict';

var _ = require('lodash');
var models = require('../../models');
var Expense = models.Expense;

// Get list of expenses
exports.query = function(req, res) {
  Expense.findAll({
    where: {UserId: req.user.user.id},
    order: 'createdAt DESC',
    limit: req.query.limit || 50,
    offset: req.query.offset || 0
  }).then(function(expenses) {
    res.json({ expense: expenses });
  });
};

// New expense
exports.create = function(req, res) {
  Expense.create({
    UserId: req.user.user.id,
    amount: req.body.amount,
    text: req.body.text
  }).then(function(expense) {
    res.status(201).json({expense: expense})
  })
};