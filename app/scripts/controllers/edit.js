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

            console.log('삭제 성공', '/expense/' + $scope.date.substr(0, 7));
            console.log(data, status, headers);

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
          $location.url('/expense/' + $scope.date.substr(0, 7));
        })
        .error(function(data, status, headers, config) {
          $location.url('/');
        });
    };

  });
