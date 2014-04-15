'use strict';

angular.module('moneyApp')
  .controller('InputModalCtrl', function ($scope, $http, $location, $route) {
    var today = new Date();
    $scope.date = today.getFullYear() + '-' +
      (today.getMonth() + 1) + '-' +
      today.getDate();

    $scope.submit = function() {
      var url = '/api/expense';
      var data = {
        date: $scope.date,
        text: $scope.text,
        amount: $scope.amount
      };

      $http.post(url, data)
        .success(function(data, status, headers, config) {
          $('#write-modal').modal('hide')
          $route.reload();
        })
        .error(function(data, status, headers, config) {
          $('#write-modal').modal('hide')
        });
    };
  });