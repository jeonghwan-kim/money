'use strict'

angular.module 'moneyApp'
.controller 'LoginCtrl', ($scope, $log, $location, $state, $http) ->
  tag = 'LoginCtrl'

  $scope.email = $location.search().tryEmail
  $scope.trySubmit = false

  $scope.login = (email, pass) ->
    $scope.trySubmit = true
    initHelpMsg();

    return if $scope.form.$invalid

    $http.post '/api/auth', {username: email, password: pass}
    .success (data) ->
      $log.info(tag, 'login success', data)
      $state.go 'main'
    .error (error) ->
      $log.warn(tag, 'login fail', error)
      $scope.helpMsg = '인증실패. 재시도'

  $scope.showError = (form, validator, trySubmit) ->
    trySubmit && form.$error && form.$error[validator]

  initHelpMsg = ->
    $scope.helpMsg = '';