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
    conn.query(q, function(err, data) {
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
          sid: data[0].sid
        });
      } else {
        // 로그인 실패
        res.send(401);
      }
    });
  });
}

exports.signin2 = function(req, res) {
  var sid = req.body.sid;

  if (!sid) {
    res.send(400);
    return;
  }

  // DB에서 유저정보 조회
  mysqlPool.getConnection(function(err, conn) {
    if (err) {
      throw err;
    }

    var q = "select * from money.user where sid = '" + sid + "'";
    conn.query(q, function(err, data) {
      conn.release();
      if (err) {
        throw err;
      }

      try {
        // 세션에 유저정보 저장.
        req.session.money = {};
        req.session.money.isSigned = true;
        req.session.money.uid = data[0].id;
        res.send(200);
      } catch (e) {
        console.log(e);
        res.send(403);
      }
    });
  });
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

    // 중복 유저 체크
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
      var sid = crypto.createHash('md5').update(email + password).digest('hex');
      q = "insert into money.user (email, password, sid) " +
        "value ('" + email + "', '" + encodedPw + "', '" + sid+ "')";

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