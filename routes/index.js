var mysql = require('mysql');
var path = require('path');
var config = require(path.join(__dirname, 'config.json'));
var monthString = require(path.join(__dirname, 'monthstring.js'));


exports.index = function (req, res) {
	if (req.session.isSigned !== true) {
		res.redirect('/signin');
		return;
	}

	var uid = req.session.uid
	var yearMonth = monthString();
	res.redirect('/expense/' + yearMonth);
};