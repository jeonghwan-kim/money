'use strict';

angular.module('moneyApp')
  .controller('EditCtrl', function ($scope, $http, $routeParams, $location) {

    $scope.id = $routeParams.id;
    $scope.date = $routeParams.date;
    $scope.text = $routeParams.text;
    $scope.amount = parseInt($routeParams.amount, 10);

    $scope.cancel = function() {
      $location.url('/expense/' + $scope.date.substr(0, 7));
    };

    $scope.delete = function() {
      if (confirm('삭제할까요?', true)) {
        $http.delete('/api/expense/' + $scope.id)
          .success(function(data, status, headers, config) {
            $http.post('/api/log', {
              type: 202,
              datetime: new Date().toYYYYMMDDHHMMSS()
            });

            $location.url('/expense/' + $scope.date.substr(0, 7));
          })
          .error(function(data, status, headers, config) {

            console.log('삭제 실패', data, status, headers);

            $location.url('/');
          });
      } else {
        return false;
      }
    };

    $scope.submit = function() {
      var url = '/api/expense/' + $scope.id;
      var data = {
        date: $scope.date,
        text: $scope.text,
        amount: $scope.amount
      };

      $http.put(url, data)
        .success(function(data, status, headers, config) {
          $http.post('/api/log', {
            type: 201,
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
