'use strict';

var tag = 'passport';
var cryptoHelper = require('../components/crypto-helper');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var models = require('../models');
var User = models.User;

exports = module.exports = function (app) {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(new LocalStrategy({}, function (username, password, done) {
    console.log(tag, 'passport.use()', username, password);

    var pass2 = cryptoHelper.md5(password);
    User.find({
      where: {email: username, pass: pass2},
      attributes: ['id', 'email', 'createdAt', 'updatedAt']
    }).then(function (user) {
      if (user) {
        console.log(tag, 'found user: ', user);
        done(null, {user: user});
      } else {
        console.log(tag, 'fail to find user');
        done(false, null);
      }
    });
  }));

  // 인증 성공후 세션에 데이터 저장시 호출됨
  passport.serializeUser(function (user, done) {
    console.log(tag, 'serializeUser()', user);
    done(null, user);
  });

  // 세션에 저장된 데이터 조회시 호출됨
  passport.deserializeUser(function (user, done) {
    console.log(tag, 'deserializeUser()', user);
    done(null, user);
  });
};