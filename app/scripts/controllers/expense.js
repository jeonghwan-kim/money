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
            sum += data[i].amount;
          }
          return sum;
        }
      })(newVal);
    });

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

    $scope.updateModal = function(expenseId, index) {

      console.log('updateModa()', expenseId, index);

      $scope.editExpenseId = expenseId;
      $scope.editIdx = index;
    };

    $scope.updateExpense = function() {
      if ($scope.editExpenseId === undefined || $scope.editIdx === undefined) {
        console.log('error1');
        return false;
      }

      var url = '/api/expense/' + $scope.editExpenseId;
      var data = {
        date: $scope.expense[$scope.editIdx].date,
        text: $scope.expense[$scope.editIdx].text,
        amount: $scope.expense[$scope.editIdx].amount
      };

      $http.put(url, data)
        .success(function(data, status, headers, config) {
          $scope.editExpenseId = undefined;
          $scope.editIdx = undefined;
          $('#update-modal').modal('hide')
          $route.reload();
        })
        .error(function(data, status, headers, config) {
          console.log('update error2');
        });
    };

    $scope.deleteExpense = function(expenseId, index) {
      if ($scope.editExpenseId === undefined || $scope.editIdx === undefined) {
        console.log('error');
        return false;
      }

      if (confirm('삭제할까요?', true)) {
        // 서버 삭제 요청
        $http.delete('/api/expense/' + $scope.editExpenseId);
        $scope.editExpenseId = undefined;

        // 클라이언트 데이터 삭제
        $scope.expense.splice($scope.editIdx, 1);
        $scope.editIdx = undefined;
      } else {
        return false;
      }
    };
  });