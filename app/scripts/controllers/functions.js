'use strict';

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

/**
 * 배열에서 expenseId 에 해당하는 지출 정보를 저장한 index를 찾는다.
 * @param  {Number} editExpenseId [description]
 * @param  {Array} expense       [description]
 * @return {Number}               [description]
 */
function getExpense(editExpenseId, expense) {
  if (editExpenseId === null || editExpenseId === undefined) {
    throw new Error('paramater is undefined');
  }

  if ((expense instanceof Array) == false) {
    throw new Error('Paramter expsnes is not an Array');
  }

  for (var i in expense) {
    if (expense[i].id === editExpenseId) {
      return i;
    }
  }

  throw new Error('editeExpenseId is not in expense Array');
}