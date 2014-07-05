'use strict';

angular.module('moneyApp')
  .controller('NewCtrl', function ($scope, $http, $location) {

    $scope.date = new Date().toYYYYMMDD();
    $scope.msg = "";
    $scope.validAmount = false;

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

      $http.post(url, param)
        .success(function(data, status, headers, config) {

          $http.post('/api/log', {
            type: 200,
            datetime: new Date().toYYYYMMDDHHMMSS()
          });

          $location.url('/expense/' + $scope.date.substr(0, 7));
        })
        .error(function(data, status, headers, config) {
          $location.url('/');
        });
    };

    $scope.$watch('amount', function(newVal, oldVal) {
      var tmp;

      if (!newVal) {
        $scope.msg = "";
        $scope.validAmount = false;
        return;
      }

      tmp = parseInt(newVal, 10);
      if (tmp < 1) {
        $scope.validAmount = false;
        $scope.msg = "지출 금액을 입력하세요";
      } else if (!tmp) {
        $scope.validAmount = false;
        $scope.msg = "금액은 숫자로 입력하세요.";
      } else {
        $scope.validAmount = true;
        $scope.msg = "";
      }
    });

  });
