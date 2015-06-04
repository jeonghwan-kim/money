'use strict';

var _ = require('lodash');
var models = require('../../models');
var Expense = models.Expense;

// Get list of expenses
exports.index = function (req, res) {
  var year = req.query.year;
  var month = (function (month) {
    if (month) {
      if (month < 10) month = '0' + month;
      return month;
    }
  })(req.query.month);

  var where = {UserId: req.user.id};
  if (year && month) {
    where.date = {$like: year + '-' + month + '%'}
  }

  Expense.findAll({
    where: where,
    order: 'date DESC',
    limit: req.query.limit || 50,
    offset: req.query.offset || 0
  })
      .then(function (expenses) {
        res.json(expenses);
      })
      .catch(function (error) {
        res.send(400);
      });
};

// Get the expense
exports.show = function (req, res) {
  models.Expense.findOne({
    where: {id: req.params.id}
  })
      .then(function (expense) {
        if (!expense) return res.send(404);
        res.send(expense);
      })
      .catch(function (err) {
        res.send(500, err);
      });
};

// Get Months list
exports.getMonths = function (req, res) {
  var sql = 'SELECT distinct(left(date, 7)) as month FROM Expenses where UserId = ' + req.user.id + ' order by month desc';
  models.sequelize.query(sql).spread(function (results, metadata) {
    res.json(_.map(results, function (n) {
      return n.month;
    }));
  }).catch(function () {
    res.send(500);
  })
};

// New expense
exports.create = function (req, res) {
  Expense.create({
    UserId: req.user.id,
    amount: req.body.amount,
    text: req.body.text,
    date: req.body.date
  })
      .then(function (expense) {
        res.status(201).json(expense)
      })
      .catch(function (error) {
        res.status(500);
      });
};

// Update expense
exports.update = function (req, res) {
  Expense.find(req.params.id).then(function (expense) {
    expense.updateAttributes({
      date: req.body.date || expense.date,
      text: req.body.text || expense.text,
      amount: req.body.amount || expense.amount
    })
        .then(function (expense) {
          res.json(expense);
        })
        .catch(function (err) {
          res.send(500, err);
        });
  });
};

// Remove expense
exports.destroy = function (req, res) {
  Expense.find(req.params.id).then(function (expense) {
    if (!expense) return res.send(404);
    expense.destroy()
        .then(function () {
          res.send(204);
        })
        .catch(function (err) {
          res.send(500, err);
        });
  });
};
