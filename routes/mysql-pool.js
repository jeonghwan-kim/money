var mysql = require('mysql');
var path = require('path');
var config = require(path.join(__dirname, 'config.json'));


var pool = mysql.createPool({
	host: config.db.host,
	port: config.db.port,
	user: config.db.user,
	password: config.db.password,
	database: config.db.database
});

module.exports = pool;
