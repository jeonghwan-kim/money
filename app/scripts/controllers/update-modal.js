'use strict';

angular.module('moneyApp')
  .controller('UpdateModalCtrl', function ($scope, $http, $routeParams, $route, $location, $cookies) {

    $scope.updateExpense = function() {
      if ($scope.editIdx === undefined) {
        console.log('error1');
        return false;
      }
      console.log($scope.editIdx);
      console.log($scope.expense);
      console.log($scope.expense[0]);

      var url = '/api/expense/' + $scope.expense[$scope.editIdx].id;
      var data = {
        date: $scope.expense[$scope.editIdx].date,
        text: $scope.expense[$scope.editIdx].text,
        amount: $scope.expense[$scope.editIdx].amount
      };

      // 서버 업데이트 요청
      $http.put(url, data)
        .success(function(data, status, headers, config) {
          $('#update-modal').modal('hide');
        })
        .error(function(data, status, headers, config) {
          console.log('update error2');
        });
    };

    $scope.deleteExpense = function(expenseId, index) {
      if ($scope.editIdx === undefined) {
        console.log('error');
        return false;
      }

      if (confirm('삭제할까요?', true)) {
        // 서버 삭제 요청
        $http.delete('/api/expense/' + $scope.expense[$scope.editIdx].id);

        // 클라이언트 데이터 삭제
        $scope.expense.splice($scope.editIdx, 1);
      } else {
        return false;
      }
    };

  });