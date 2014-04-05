var path = require('path');
var crypto = require('crypto');
var mysqlPool = require(path.join(__dirname, './mysql-pool'));

exports.signin = function (req, res) {
	var email = req.body.email;
	var password = req.body.password;

	if (!email || !password) {
		res.send(400);
		return;
	}


	mysqlPool.getConnection(function (err, conn) {
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
				req.session.isSigned = true;
				req.session.uid = data[0].id

				res.redirect('/');
			} else {
				req.session.isSigned = false;
				res.redirect('/signin');
			}
		});
	})
};

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

		res.redirect('/signin');
		return;
	});
}

exports.signout = function (req, res) {
	req.session.uid = null;
	req.session.isSigned = null;
	res.redirect('/');
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