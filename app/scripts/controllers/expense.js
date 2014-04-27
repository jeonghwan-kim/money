'use strict';

angular.module('moneyApp')
  .controller('ExpenseCtrl', function ($scope, $http, $routeParams, $route, $location, $cookies) {

    // 지출 이력을 받아온다.
    $http.get('/api/expense/' + $routeParams.yearMonth)
      .success(function(data) {
        $scope.expense = data.data;
        $scope.sum = data.total;
        $scope.curMonth = data.curMonth;
        $scope.yearmonth = data.monthList;

        console.log(data.data);
      })
      .error(function(data, status) {
        $location.url('/login');
      });
    ;

    $scope.deleteExpense = function() {
      var delIdx = $scope.editExpenseId;
      var delExpenseId;

      if (confirm('삭제할까요?', true)) {
        delExpenseId = $scope.expense[delIdx].id;
        $scope.expense.splice(delIdx, 1);

        // 서버 삭제 비동기 처리
        $http.delete('/api/expense/' + delExpenseId);
      } else {
        return false;
      }
    };

    $scope.signout = function() {
      // 쿠키 삭제
      $.removeCookie('sid');

      // 세션 삭제 요청
      $http.post('/api/signout').success(function() {
        $location.url('/signin');
      });
    }

    $scope.updateModal = function(expenseId) {
      var len = $scope.expense.length;
      for (var i = 0; i < len; i++) {
        if ($scope.expense[i].id == expenseId) {
          $scope.editExpenseId = i;
          // console.log('searched!', new Date($scope.expense[i].date));
          return;
        }
      }
    };

    $scope.updateExpense = function() {
      var url = '/api/expense/' + $scope.expense[$scope.editExpenseId].id;
      var data = {
        date: $scope.expense[$scope.editExpenseId].date,
        text: $scope.expense[$scope.editExpenseId].text,
        amount: $scope.expense[$scope.editExpenseId].amount
      };

      console.log('edited url: ' + url);
      console.log('edited data: ' + data);

      // return;

      $http.put(url, data)
        .success(function(data, status, headers, config) {
          $route.reload();
        })
        .error(function(data, status, headers, config) {
          console.log('update error');
        });
    };
  });