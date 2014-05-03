'use strict';

angular.module('moneyApp')
  .controller('ExpenseCtrl', function ($scope, $http, $routeParams, $route, $location, $cookies) {

    $scope.expense = undefined;
    $scope.yearmonth = undefined;
    $scope.curMonth = undefined;
    $scope.sum = undefined;
    $scope.expenseId = undefined;
    $scope.deleteIdx = undefined;


    // expnese를 감시하여 총액을 수시로 계산한다.
    $scope.$watch('expense', function(newVal, oldVal) {
      $scope.sum = (function(data) {
        if (data) {
          var sum = 0;
          for (var i in data) {
            sum += parseInt(data[i].amount, 10);
          }
          return sum;
        }
      })(newVal);
    }, true);

    // 기록 월 리스트를 받아온다.
    $http.get('/api/month')
      .success(function(data) {
        $scope.yearmonth = data.month;
      })
      .error(function(data, status) {
        $location.url('/login');
      });

    // 지출 이력을 받아온다.
    $http.get('/api/expense/' + $routeParams.yearMonth)
      .success(function(data) {
        $scope.expense = data;
        $scope.curMonth = $routeParams.yearMonth;

        console.log($scope.expense);
      })
      .error(function(data, status) {
        $location.url('/login');
      });


    $scope.signout = function() {
      // 쿠키 삭제
      $.removeCookie('sid');

      // 세션 삭제 요청
      $http.post('/api/signout').success(function() {
        $location.url('/signin');
      });
    }

    $scope.updateModal = function(index) {
      $scope.editIdx = index;
    };

  });