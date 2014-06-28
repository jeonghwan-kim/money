'use strict';

angular.module('moneyApp')
  .controller('NewCtrl', function ($scope, $http, $location) {

    $scope.date = new Date().toYYYYMMDD();
    $scope.msg = "";

    $scope.cancel = function() {
      $location.url('/expense/' + $scope.date.substr(0, 7));
    };

    $scope.submit = function() {
      var url = '/api/expense',
        amount = parseInt($scope.amount, 10),
        param = {
          date: $scope.date,
          text: $scope.text,
          amount: amount
        };

      if (!amount) {
        $scope.msg = "금액란은 숫자만 입력하세요."
        return;
      }

      $http.post(url, param)
        .success(function(data, status, headers, config) {
          $location.url('/expense/' + $scope.date.substr(0, 7));
        })
        .error(function(data, status, headers, config) {
          $location.url('/');
        });
    };

  });
