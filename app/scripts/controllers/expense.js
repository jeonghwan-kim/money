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

    $scope.deleteExpense = function(delId) {
      if (confirm('삭제할까요?', true)) {
        var len = $scope.expense.length;
        for (var i = 0; i < len; i++) {
          if ($scope.expense[i].id === delId) {
            $scope.expense.splice(i, 1);
            break;
          }
        }

        // 서버 삭제 비동기 처리
        $http.delete('/api/expense/' + delId);
      } else {
        return false;
      }
    };

    $scope.signout = function() {
      // 쿠키 삭제
      $.removeCookie('uid');

      // 세션 삭제 요청
      $http.post('/api/signout').success(function() {
        $location.url('/signin');
      });
    }
  });