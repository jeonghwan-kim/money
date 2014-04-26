'use strict';

angular.module('moneyApp')
  .controller('ExpenseCtrl', function ($scope, $http, $routeParams, $route, $location, $cookies) {

    $http.get('/api/expense/' + $routeParams.yearMonth)
      .success(function(data) {
        $scope.expense = data.data;
        $scope.sum = data.total;
        $scope.curMonth = data.curMonth;
        $scope.yearmonth = data.monthList;
      })
      .error(function(data, status) {
        $location.url('/login');
      });
    ;

    $scope.deleteExpense = function(expenseId) {

      console.log(expenseId);

      if (confirm('삭제할까요?', true)) {
        var len = $scope.expense.length;
        for (var i = 0; i < len; i++) {
          if ($scope.expense[i].id === expenseId) {
            $scope.expense.splice(i, 1);
            break;
          }
        }

        // 서버 삭제 비동기 처리
        $http.delete('/api/expense/' + expenseId);
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

    $scope.updateModal = function(date, text, amount, expenseId) {
      console.log(date, text, amount, expenseId);

      $scope.modal = {};
      $scope.modal.date = date.split(/T/)[0];
      $scope.modal.text = text;
      $scope.modal.amount = amount;
      $scope.modal.expenseId = expenseId;
    };

    $scope.updateExpense = function() {
      var url = '/api/expense/' + $scope.modal.expenseId;
      var data = {
        date: $scope.modal.date,
        text: $scope.modal.text,
        amount: $scope.modal.amount
      };

      $http.put(url, data)
        .success(function(data, status, headers, config) {
          $route.reload();
        })
        .error(function(data, status, headers, config) {
          console.log('update error');
        });
    };
  });