'use strict';

var _ = require('lodash');
var models = require('../../models');
var Expense = models.Expense;

// Get list of expenses
exports.query = function (req, res) {
  console.log(req.query.year);
  console.log(req.query.month);

  Expense.findAll({
    where: {UserId: req.user.user.id},
    order: 'createdAt DESC',
    limit: req.query.limit || 50,
    offset: req.query.offset || 0
  }).then(function (expenses) {
    res.json({expense: expenses});
  });
};

// New expense
exports.create = function (req, res) {
  Expense.create({
    UserId: req.user.user.id,
    amount: req.body.amount,
    text: req.body.text,
    date: new Date(req.body.date + ' 00:00:00')
  }).then(function (expense) {
    res.status(201).json({expense: expense})
  }).catch(function (error) {
    console.error(error);
    res.status(500);
  });
};

// Update expense
exports.update = function (req, res) {
  Expense.find(req.body.expenseId).then(function (expense) {
    expense.updateAttributes({
      amount: req.body.amount || expense.amount,
      text: req.body.text || expense.text
    }).then(function (expense) {
      res.json({expense: expense});
    });
  });
};

// Remove expense
exports.remove = function (req, res) {
  Expense.find(req.body.expenseId).then(function (expense) {
    expense.destroy().then(function (data) {
      res.json({delted: data});
    });
  });
};
