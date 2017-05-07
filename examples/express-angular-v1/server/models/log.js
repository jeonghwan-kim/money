'use strict';

module.exports = function(sequelize, DataTypes) {
  var Log = sequelize.define('Log', {
    log: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Log;
};