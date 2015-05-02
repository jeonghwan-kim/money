'use strict';

module.exports = function(sequelize, DataTypes) {
  var Expense = sequelize.define('Expense', {
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true
      }
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Expense;
};