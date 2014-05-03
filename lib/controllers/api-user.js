'use strict';

var path = require('path');
var crypto = require('crypto');
var mysqlPool = require(path.join(__dirname, './mysql-pool'));

exports.signin = function(req, res) {
  var email = req.body.email;
  var password = req.body.password;

  signIn(email, password, function(result, data) {
    if (result) { // 로그인 성공
      req.session.uid = data; // 세션에 uid 저장
      res.send({ // 세션 id 반환
        sid: req.sessionID
      });
    } else { // 로그인 실패
      res.send(data);
    }
  });
};

exports.signin2 = function(req, res) {
  var sid = req.body.sid;

  if (!sid) {
    res.send(400);
    return;
  }

  // 세션 설정
  req.sessionID = sid;

  if (req.session.uid > 0) {
    res.send(200);
  } else {
    res.send(403);
  }
};

exports.signup = function (req, res) {
  var newEmail = req.param('email');
  var newPassword = req.param('password');

  createUser(newEmail, newPassword, function (result, data) {
    if (result) {
      res.send(201, {newId: data});
    } else {
      res.send(data);
    }
  });
};

exports.signout = function (req, res) {
  if (req.session.uid) {
    delete req.session.uid;
    res.send(204);
  } else {
    res.send(403);
  }
};

/**
 * 사인인
 * @param  {[type]}   email    [description]
 * @param  {[type]}   password [description]
 * @param  {Function} cb       [description]
 * @return {[type]}            성공시: user_id 반환 / 실패시: http error code 반환
 */
function signIn(email, password, cb) {
  if (!email || !password) {
    cb(false, 400);
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

        cb(true, data[0].id); // user_id 반환
        return;
      } else {
        cb(false, 403); // 로그인 정보 불일치
      }
    });
  });
}

/**
 * 신규 유저 추가
 * @param  {[type]}   email    [description]
 * @param  {[type]}   password [description]
 * @param  {Function} cb       [description]
 * @return {[type]}            [description]
 */
function createUser(email, password, cb) {
  if (!email || !password) {
    cb(false, 400);
    return;
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

      if (data.length && data[0].email === email) { // 중복!
        cb(false, 400);
        return;
      }

      var encodedPw = crypto.createHash('md5').update(password).digest('hex');
      q = "insert into money.user (email, password) " +
        "value ('" + email + "', '" + encodedPw + "')";

      conn.query(q, function (err, data) {
        conn.release();
        if (err) {
          throw err;
        }

        // 신규 user_id 반환
        cb(true, data.insertId);
        return;
      });
    });
  });
};


// =============================================================================
// Unit test 용 함수
// =============================================================================

function deleteUser(email, cb) {
  if (!email) {
    cb(false);
    return;
  }

  mysqlPool.getConnection(function (err, conn) {
    if (err) {
      throw err;
    }

    var q = "delete from money.user where email='" + email + "'";
    conn.query(q, function (err, data) {
      if (err) {
        throw err;
      }

      if (data.affectedRows == 1) {
        cb(true);
      } else {
        cb(false);
      }
    });
  });
}

/**
 * 유닛테스트용 함수
 * @param  {[type]}   email [description]
 * @param  {Function} cb    [description]
 * @return {[type]}         [description]
 */
exports.deleteUser = function(email, cb) {
  deleteUser(email, cb);
};

exports.createUser = function(email, password, cb) {
  createUser(email, password, cb);
};