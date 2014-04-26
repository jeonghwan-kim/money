'use strict';

angular.module('moneyApp')
  .controller('UpdateModalCtrl', function ($scope, $http, $location, $route) {

    console.log('update-modal.js');

    // $scope.expenseId;
    // $scope.date;
    // $scope.text;
    // $scope.amount;

    $scope.submit = function(expenseId, date, text, amount) {
      var url = '/api/expense/' + expenseId;
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

    // angular.element('#update-modal').on('show.bs.modal', function (e) {

    //   console.log('modal');

    //   $scope.expenseId = angular.element(e.relatedTarget).attr('expenseId');
    //   $scope.date = angular.element(e.relatedTarget).attr('date');
    //   $scope.text = angular.element(e.relatedTarget).attr('text');
    //   $scope.amount = angular.element(e.relatedTarget).attr('amount');

    //   $scope.foo($scope.date, $scope.text, $scope.amount);
    // });

    $scope.$watch('data', function(newVal, oldVal) {
      console.log('data is changed:', newVal, oldVal);
    });

    $scope.updateModal = function(date) {
      console.log('foo()', date);
      $scope.date = date;
    };
  });