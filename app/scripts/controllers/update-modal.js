'use strict';

angular.module('moneyApp')
  .controller('UpdateModalCtrl', function ($scope, $http) {

    $scope.updateExpense = function() {
      if ($scope.editIdx === undefined) {
        console.log('edit index is undefined');
        return false;
      }

      // 서버 업데이트 요청
      var url = '/api/expense/' + $scope.expense[$scope.editIdx].id;
      var data = {
        date: $scope.editDate,
        text: $scope.editText,
        amount: $scope.editAmount
      };

      $http.put(url, data)
        .success(function(data, status, headers, config) {
          $('#update-modal').modal('hide');
        })
        .error(function(data, status, headers, config) {
          console.log('update error2');
        });

      // 클라이언트 데이터 업데이트
      $scope.expense[$scope.editIdx].date = $scope.editDate;
      $scope.expense[$scope.editIdx].text = $scope.editText;
      $scope.expense[$scope.editIdx].amount = $scope.editAmount;
    };

    $scope.deleteExpense = function(expenseId, index) {
      if ($scope.editIdx === undefined) {
        console.log('edit index is undefined');
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