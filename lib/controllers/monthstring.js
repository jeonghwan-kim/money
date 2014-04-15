var path = require('path');

function getThisMonthString(date) {
  if (!date) {
    // 파라메터가 없을 경우
    var d = new Date()
    var year = d.getFullYear();
    var month = (function (month) {
      month = month.toString();

      if (month.length === 1) {
        month = '0' + month;
      }

      return month;
    })(d.getMonth() + 1);

    return year + '-' + month;
  } else if (date.match(/\d{4}-\d+/)) {
    // 2013-1-10 형태일 경우
    var date = date.match(/\d{4}-\d+/)[0];
    var year = date.split('-')[0];
    var month = (function (month) {
      month = month.toString();

      if (month.length === 1) {
        month = '0' + month;
      }

      return month;
    })(date.split('-')[1]);

    return year + '-' + month;
  }
}

module.exports = getThisMonthString;