var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var cryptoHelper = require('../../components/crypto-helper');
var debug = require('debug')('auth');

exports.setup = function (User) {
  passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password'
    },
    function(email, password, done) {
      User.findOne({
        attributes: ['id', 'email', 'name', 'role', 'createdAt', 'updatedAt'], // Except password
        where: {
          email: email.toLowerCase(),
          password: cryptoHelper.md5(password)
        }
      }).then(function (user) {
        if (!user) return done(null, false);
        user = user.get({plain: true});
        return done(null, user);
      }).catch(function (err) {
        if (err) return done(err);
      });
    }
  ));
};