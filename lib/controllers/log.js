'use strict';

var mysqlPool = require('./mysql-pool');

module.exports = function(req, res) {
  var type = parseInt(req.body.type, 10),
    datetime = req.body.datetime,
    comment = req.body.comment || "",
    user_id = req.session.uid,
    query = "";

  if (!user_id) {
    res.send(403);
    return;
  }
  if (!type || !datetime) {
    res.send(400);
    return;
  }

  query = "insert into money.log (user_id, datetime, type, comment) values " +
    "(" + user_id + ", '" + datetime + "', '" + type + "', '" +  comment + "')";

  mysqlPool.getConnection(function (err, conn) {
    if (err) {
      throw err;
    }

    conn.query(query, function (err, data) {
      conn.release();
      if (err) {
        throw err;
      }

      res.send(201);
    });
  });

};