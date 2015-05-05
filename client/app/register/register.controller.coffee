'use strict'

angular.module 'moneyApp'
.controller 'RegisterCtrl', ($scope, $log) ->
  tag = 'RegisterCtrl'
  $scope.register = ->
    $log.log tag, 'register()'
    $log.log tag, 'form.$invalid:', $scope.form.$invalid
    $scope.trySubmit = true
    $log.log tag, 'input values are enough', $scope.user if $scope.form.$valid
    # call api
    # ...

  $scope.showError = (form, validator, trySubmit) ->
    $log.log tag, 'showError()'
    $log.log tag, 'trySubmit:', trySubmit
    $log.log tag, 'form.$error[validator]', form.$error[validator]
    result = trySubmit && form.$error[validator]
    $log.log tag, 'result: ', result
    result


