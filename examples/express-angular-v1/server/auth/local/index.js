'use strict';

var express = require('express');
var passport = require('passport');
var Joi = require('express-joi').Joi;
var joiValidate = require('express-joi').joiValidate;
var auth = require('../auth.service');
var cryptoHelper = require('../../components/crypto-helper');
var email = require('../../components/email');
var models = require('../../models');
var router = express.Router();

var schema = {
  update: {
    email: Joi.types.string().email().required()
  }
};

router.post('/', login);
router.put('/', joiValidate(schema.update, {strict: false}), resetPassword);

function login(req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    var error = err || info;
    if (error) return res.json(401, error);
    if (!user) return res.json(404, {message: 'Something went wrong, please try again.'});

    var token = auth.signToken(user.id, user.role);
    res.json({token: token});
  })(req, res, next)
}

function resetPassword(req, res) {
  var newPassword = new Date().getTime().toString().substring(6, 12);
  var newPassword2 = cryptoHelper.md5(newPassword);

  models.User.findOne({where: {email: req.body.email}}).then(function (user) {
    if (!user) return res.status(404).send();
    user.updateAttributes({password: newPassword2})
        .then(function (affectedCount) {
          if (affectedCount) {
            email('Reset Password: ' + newPassword, '', user.email).then(function (info) {
              res.json(info);
            }, function (error) {
              res.send(500, error);
            })
          } else {
            res.send(404);
          }
        });
  });
}

module.exports = router;