'use strict'

angular.module 'moneyApp'
.controller 'NewexpenseCtrl', ($scope, $log, $http) ->
  tag = 'NewexpenseCtrl'

  $scope.expense = {}
  $scope.save = ->
    $scope.trySubmit = true
    return if $scope.form.$invalid
    $log.debug $scope.expense
    $http.post '/api/expenses', $scope.expense
    .success (date) ->
      $log.debug tag, date
    .error (error) ->
      $log.error tag, error


  $scope.showError = (form, validator, trySubmit) ->
    trySubmit && form.$error && form.$error[validator]
