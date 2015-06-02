'use strict'

angular.module 'moneyApp'
.controller 'NewexpenseCtrl', ($scope, $log, $http) ->
  tag = 'NewexpenseCtrl'

  $scope.expense = {}
  $scope.save = ->
    $scope.trySubmit = true
    return if $scope.form.$invalid
    payload = _.clone $scope.expense
    payload.date = moment(payload.date).format('YYYY-MM-DD')
    $http.post '/api/expenses', payload
    .success (date) ->
      $log.debug tag, date
    .error (error) ->
      $log.error tag, error


  $scope.showError = (form, validator, trySubmit) ->
    trySubmit && form.$error && form.$error[validator]
