'use strict';

angular.module('moneyApp')
  .controller('InputModalCtrl', function ($scope, $http, $location, $route) {
    var today = new Date();
    $scope.date = today.getFullYear() + '-' +
      (today.getMonth() + 1) + '-' +
      today.getDate();

    $scope.submit = function() {
      var url = '/api/expense';
      var newRow = {
        date: $scope.date,
        text: $scope.text,
        amount: $scope.amount
      };

      // 서버 데이터 입력 요청
      $http.post(url, newRow)
        .success(function(data, status, headers, config) {
          newRow.id = data.insertId;

          $scope.expense.push(newRow); // 클라이언트 데이터에 추가

          $('#input-modal').modal('hide');
        })
        .error(function(data, status, headers, config) {
          $('#input-modal').modal('hide')
        });
    };
  });