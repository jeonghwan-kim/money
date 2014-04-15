'use strict';

var path = require('path');
var crypto = require('crypto');
var mysqlPool = require(path.join(__dirname, './mysql-pool'));

exports.signin = function(req, res) {
  var email = req.body.email;
  var password = req.body.password;

  if (!email || !password) {
    res.send(400);
    return;
  }
  mysqlPool.getConnection(function(err, conn) {
    if (err) {
      throw err;
    }

    var encodedPw = crypto.createHash('md5').update(password).digest('hex');
    var q = "select * from money.user " +
      "where email='" + email + "' and password='" + encodedPw + "'";
    conn.query(q, function (err, data) {
      conn.release();
      if (err) {
        throw err;
      }

      if (data.length === 1) {
        if (data[0].email !== email) {
          throw new Error('email is not matched');
        }

        // 로그인 성공, 세션에 저장
        req.session.money = {};
        req.session.money.isSigned = true;
        req.session.money.uid = data[0].id;
        res.send({
          uid: req.session.money.uid
        });
      } else {
        // 로그인 실패
        res.send(401);
      }
    });
  });
}

exports.signin2 = function(req, res) {
  var uid = req.body.uid;

  if (!uid) {
    res.send(400);
    return;
  }

  // 세션에 저장
  req.session.money = {};
  req.session.money.isSigned = true;
  req.session.money.uid = uid;
  res.send(200);

  console.log(req.body);
}

exports.signup = function (req, res) {
  var newEmail = req.param('email');
  var newPassword = req.param('password');

  if (!newEmail || !newPassword) {
    res.send(400, 'uid or password is invalid');
    return;
  }

  createUser(newEmail, newPassword, function (duplicated, newId) {
    if (duplicated === true) {
      res.send(400, 'Duplicated email address.');
      return;
    }

    res.send({newId: newId});
    return;
  });
}

exports.signout = function (req, res) {
  if (req.session.money) {
    delete req.session.money;
  }
  res.send(200);
}

function createUser(email, password, cb) {
  if (!email || !password) {
    throw new Error('uid or password is invalid');
  }

  mysqlPool.getConnection(function (err, conn) {
    if (err) {
      throw err;
    }

    var q = "select email from money.user where email='" + email + "'";
    conn.query(q, function (err, data) {
      if (err) {
        throw err;
      }

      var duplicated = false, newId = undefined;

      if (data.length && data[0].email === email) { // 중복!
        duplicated = true;
        cb(duplicated, newId);
        return;
      }

      var encodedPw = crypto.createHash('md5').update(password).digest('hex');
      q = "insert into money.user (email, password) value ('" + email + "', '" + encodedPw + "')";

      conn.query(q, function (err, data) {
        conn.release();
        if (err) {
          throw err;
        }

        cb(duplicated, data.insertId);
        return;
      });
    });
  });
};