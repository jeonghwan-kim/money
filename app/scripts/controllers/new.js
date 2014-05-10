'use strict';

angular.module('moneyApp')
  .controller('NewCtrl', function ($scope, $http, $location) {

    $scope.date = new Date().toYYYYMMDD();

    $scope.cancel = function() {
      $location.url('/expense/' + $scope.date.substr(0, 7));
    };

    $scope.submit = function() {
      var url = '/api/expense';
      var param = {
        date: $scope.date,
        text: $scope.text,
        amount: $scope.amount
      };

      $http.post(url, param)
        .success(function(data, status, headers, config) {
          $location.url('/expense/' + $scope.date.substr(0, 7));
        })
        .error(function(data, status, headers, config) {
          $location.url('/');
        });
    };

  });
