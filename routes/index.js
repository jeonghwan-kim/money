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


exports.index = function (req, res) {
  res.render('index', { title: 'Money' });
};

exports.getMonthlyHistory = function (req, res) {
	var uid = req.param('uid');
	var yearMonth = req.param('yearMonth');

	if (!uid || !yearMonth) {
		res.send(400, 'uid or yearMonth is invalid');
		return;
	}

	_getMonthlyHistory(uid, yearMonth, function (data, total) {
		res.render('index', {
			data: data,
			total: total
		});
		return;
	});
};




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

		var q = "select * from (select * , substr(date,1,7) as month from money ) as subquery where month='" + yearMonth + "' order by date desc, id desc";

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
					tmp.getMonth() + '-' +
					tmp.getDate();

				// 총 지출 계산
				total += data[i].amount;
			}

			cb(data, total);
			return;
		});
	});
}