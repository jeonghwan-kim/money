'use strict';

var crypto = require('crypto');

exports.md5 = function (text) {
  if (text) {
    return crypto.createHash('md5').update(text.toString()).digest('hex');
  }
};