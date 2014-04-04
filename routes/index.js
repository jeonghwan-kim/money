var mysql = require('mysql');
var path = require('path');
var config = require(path.join(__dirname, 'config.json'));

var mysqlPool = mysql.createPool({
	host: config.db.host,
	port: config.db.port,
	user: config.db.user,
	password: config.db.password,
	database: config.db.database
});

var self = this;


exports.index = function (req, res) {
	var uid = req.param('uid');
	var yearMonth = req.param('yearMonth');

	if (uid && yearMonth) {
		self.viewExpenseHistory(req, res);
	} else {
		res.render('sign-up');
	}
};

exports.signin = function (req, res) {
	res.render('sign-in');
};

exports.viewExpenseHistory = function (req, res) {
	var uid = req.param('uid');
	var yearMonth = req.param('yearMonth');

	if (!uid || !yearMonth) {
		res.send(400, 'uid or yearMonth is invalid');
		return;
	}

	_getMonthlyHistory(uid, yearMonth, function (data, total) {
		_getMonthList(uid, function (monthList) {
			res.render('expense-history', {
				data: data,
				total: total,
				monthList: monthList,
				curMonth: yearMonth,
				uid: uid
			});
			return;
		});
	});
};

exports.insertExpense = function (req, res) {
	var uid = req.param('uid');
	var date = req.param('date');
	var text = req.param('text');
	var amount = req.param('amount');

	if (!uid || !date || !text || !amount) {
		res.send(400, 'uid or or date or text or amount is invalid');
		return;
	}

	_insertExpense(uid, date, text, amount, function (insertId) {
		res.send({insertId: insertId});
		return;
	})
};

exports.deleteExpense = function (req, res) {
	var uid = req.param('uid');
	var expenseId = req.param('expenseId');

	if (!uid || !expenseId) {
		res.send(400, 'uid or expenseId is invalid');
		return;
	}

	_deleteExpense(uid, expenseId, function (deletedRows) {
		res.send({deletedRows: deletedRows});
		return;
	})
};

exports.createUser = function (req, res) {
	var newEmail = req.param('email');
	var newPassword = req.param('password');

	if (!newEmail || !newPassword) {
		res.send(400, 'uid or password is invalid');
		return;
	}

	_createUser(newEmail, newPassword, function (duplicated, newId) {
		if (duplicated) {
			res.send(400, 'Duplicated email address.');
			return;
		}

		res.send(200, newId.toString());
		return;
	});
}


/**
 * 사용자가 기록한 지출월 목록을 반환한다.
 *
 * @param  {[type]}   uid [description]
 * @param  {Function} cb  [description]
 * @return {[type]}       [description]
 */
function _getMonthList(uid, cb) {
	if (!uid) {
		throw new Error('uid is invalid');
	}

	mysqlPool.getConnection(function (err, conn) {
		if (err) {
			throw err;
		}

		var q = "select distinct(substr(date,1,7)) as yearmonth from record where uid=" + uid + " order by yearmonth desc";

		conn.query(q, function (err, data) {
			conn.release();
			if (err) {
				throw err;
			}

			cb(data);
			return;
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
function _getMonthlyHistory(uid, yearMonth, cb) {
	if (!uid || !yearMonth) {
		throw new Error('uid or yearMonth is invalid');
	}

	mysqlPool.getConnection(function (err, conn) {
		if (err) {
			throw err;
		}

		var q = "select * from (select *, substr(date,1,7) as month from record where uid=" + uid + ") as a where month='" + yearMonth + "' order by date desc, id desc";

		conn.query(q, function (err, data) {
			conn.release();
			if (err) {
				throw err;
			}

			var i, len = data.length, total = 0;
			for (i = 0; i < len; i++) {
				// 날짜 형식 변환
				var tmp = new Date(data[i].date);
				data[i].date = tmp.getFullYear() + '-' +
					(tmp.getMonth() + 1) + '-' +
					tmp.getDate();

				// 총 지출 계산
				total += data[i].amount;
			}

			cb(data, total);
			return;
		});
	});
}

/**
 * 지출 1개를 데이터 베이스에 저장하는 함수
 *
 * @param  {[type]}   uid    [description]
 * @param  {[type]}   date   [description]
 * @param  {[type]}   text   [description]
 * @param  {[type]}   amount [description]
 * @param  {Function} cb     [description]
 * @return {[type]}          [description]
 */
function _insertExpense(uid, date, text, amount, cb) {
	if (!uid || !date || !text || !amount) {
		throw new Error ('uid or date or text or amount is invalid');
	}

	var q = "insert into record (uid, date, text, amount) values " +
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

			cb(data.insertId);
			return;
		});
	});
}

function _deleteExpense(uid, expenseId, cb) {
	if (!uid || !expenseId) {
		throw new Error('uid or expenseID is invalid');
	}


	mysqlPool.getConnection(function (err, conn) {
		if (err) {
			throw err;
		}

		var q = "delete from money where id=" + expenseId;
		conn.query(q, function (err, data) {
			conn.release();
			if (err) {
				throw err;
			}

			cb(data.affectedRows);
		});
	});
}

function _createUser(email, password, cb) {
	if (!email || !password) {
		throw new Error('uid or password is invalid');
	}

	mysqlPool.getConnection(function (err, conn) {
		if (err) {
			throw err;
		}

		var q = "select email from user where email='" + email + "'";
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

			q = "insert into user (email, password) value ('" + email + "', '" + password + "')";
			conn.query(q, function (err, data) {
				conn.release();
				if (err) { // 중복!
					duplicated = true;
					cb(duplicated, newId);
					return;
				}

				cb(duplicated, data.insertId);
				return;
			});
		});
	});
};