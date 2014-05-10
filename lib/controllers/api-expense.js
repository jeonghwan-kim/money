'use strict';

var path = require('path'),
    mysqlPool = require(path.join(__dirname, './mysql-pool')),
    monthString = require(path.join(__dirname, './monthstring'));
    require('./Date');


exports.listExpense = function(req, res) {
  // Check signin
  if (!req.session.uid) {
    res.send(403);
    return;
  }

  var uid = req.session.uid;
  var yearMonth = req.params.yearMonth;

  getMonthlyHistory(uid, yearMonth, function(result, data) {
    if (result) {
      res.send(200, data);
    } else {
      res.send(data);
    }
  })
};

exports.insertExpense = function(req, res) {
  var date = req.body.date;
  var text = req.body.text;
  var amount = req.body.amount;
  var uid = req.session.uid;


  insert(date, text, amount, uid, function(result, data) {
    if (result) {
      res.send(201, {insertId: data});
    } else {
      res.send(data);
    }
  });
};

exports.updateExpense = function(req, res) {
  var expenseId = req.param('expenseId');
  var date = req.body.date;
  var text = req.body.text;
  var amount = req.body.amount;
  var uid = req.session.uid;

  update(expenseId, uid, date, text, amount, function(result, data) {
    if (result) {
      res.send(200, {expenseId: data});
    } else {
      res.send(data);
    }
  });
};

exports.deleteExpense = function(req, res) {
  // Check signin
  if (!req.session.uid) {
    res.send(401);
    return;
  }

  var id = req.params.id;
  var uid = req.session.uid;

  remove(id, uid, function(result, data) {
    if (result) {
      res.send(200);
    } else {
      res.send(data);
    }
  });
};

exports.getMonth = function(req, res) {
  // Check signin
  if (!req.session.uid) {
    res.send(401);
    return;
  }

  getMonthList(req.session.uid, function(result, data) {
    if (result) {
      res.send(200, {month: data});
    } else {
      res.send(data)
    }
  });
};

/**
 * 사용자가 기록한 지출월 목록을 반환한다.
 *
 * @param  {[type]}   uid [description]
 * @param  {Function} cb  [description]
 * @return {[type]}       [description]
 */
function getMonthList(uid, cb) {
  if (!uid) {
    cb(false, 400);
    return;
  }

  mysqlPool.getConnection(function (err, conn) {
    if (err) {
      throw err;
    }

    var q = "select distinct(substr(date,1,7)) as yearmonth from money.expense where uid=" + uid + " order by yearmonth desc";

    conn.query(q, function (err, data) {
      conn.release();
      if (err) {
        throw err;
      }

      var tmp = [];
      for (var i in data) {
        tmp.push(data[i].yearmonth);
      }
      cb(true, tmp);
    });
  });
}

/**
 * 월별 지출 이력을 반환한다.
 *
 * @param  {[type]}   uid       [description]
 * @param  {[type]}   yearMonth [description]
 * @param  {Function} cb        [description]
 * @return {[type]}             [description]
 */

function getMonthlyHistory(uid, yearMonth, cb) {
  if (!uid || !yearMonth) {
    cb(false, 400);
    return;
  }

  mysqlPool.getConnection(function (err, conn) {
    if (err) {
      throw err;
    }

    var q = "select id, date, text, amount from money.expense where uid=" + uid + " and date like '"+yearMonth+"%' order by date desc, id desc";

    conn.query(q, function (err, data) {
      conn.release();
      if (err) {
        throw err;
      }

      // 날짜 형식 변환
      var i, len = data.length;
      for (i = 0; i < len; i++) {
        data[i].date = data[i].date.toYYYYMMDD();
      }

      cb(true, data);
      return;
    });
  });
}

function insert(date, text, amount, uid, cb) {
  if (!uid || !date || !text || !amount) {
    cb(false, 400);
    return;
  }

  var q = "insert into money.expense (uid, date, text, amount) values " +
    "(" + uid + ", '" + date + "', '" + text + "', '" +  amount + "')";

  mysqlPool.getConnection(function (err, conn) {
    if (err) {
      throw err;
    }

    conn.query(q, function (err, data) {
      conn.release();
      if (err) {
        throw err;
      }

      if (data.insertId > 0) {
        cb(true, data.insertId);
      } else {
        cb(false, 500);
      }
    });
  });
}

function remove(expenseId, uid, cb) {
  if (!expenseId || !uid) {
    cb(false, 400);
    return;
  }

  mysqlPool.getConnection(function (err, conn) {
    if (err) {
      throw err;
    }

    var q = "delete from money.expense where id=" + expenseId + " and uid=" + uid;
    conn.query(q, function (err, data) {
      conn.release();
      if (err) {
        throw err;
      }

      if (data.affectedRows === 1) {
        cb(true, 200);
      } else {
        cb(false, 500);
      }
    });
  });
}

function update(expenseId, uid, date, text, amount, cb) {
  if (!expenseId || !uid || !date || !text || !amount) {
    cb(false, 400);
    return;
  }

  var q = "update money.expense set uid = " + uid +
    ", date = '" + date +
    "', text = '" + text +
    "', amount = " + amount +
    " where id = " + expenseId;

  mysqlPool.getConnection(function (err, conn) {
    if (err) {
      throw err;
    }

    conn.query(q, function (err, data) {
      conn.release();
      if (err) {
        throw err;
      }

      if (data.affectedRows === 1) {
        cb(true, expenseId);
      } else {
        cb(false, 500);
      }
    });
  });
}

// =============================================================================
// 유닛 테스트용 함수
// =============================================================================

exports.getMonthlyHistory = function(uid, yearMonth, cb) {
  getMonthlyHistory(uid, yearMonth, cb);
};

exports.getMonthList = function(uid, cb) {
  getMonthList(uid, cb);
};

exports.insert = function(date, text, amount, uid, cb) {
  insert(date, text, amount, uid, cb);
};

exports.remove = function(expenseId, uid, cb) {
  remove(expenseId, uid, cb);
};

exports.update = function(expenseId, uid, date, text, amount, cb) {
  update(expenseId, uid, date, text, amount, cb);
};