'use strict';

var Q = require('q');
var nodemailer = require('nodemailer');
var config = require('../../config/environment');

exports.send = function (subject, body, recvAddress) {
  var senderAddress = 'ej88ej@gmail.com';
  var transport = nodemailer.createTransport({
    service: config.email.service,
    auth: {
      user: config.email.senderAddress,
      pass: config.email.password
    }
  });
  var options = {
    from: senderAddress,
    bcc: senderAddress,
    to: recvAddress,
    subject: subject,
    html: "<div>" + body + "</div>"
  };

  var deferred = Q.defer();
  transport.sendMail(options, function (error, info) {
    if (error) {
      deferred.reject(error);
    }
    deferred.resolve(info);
  });
  return deferred.promise;
};