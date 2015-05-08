'use strict'

angular.module 'moneyApp'
.controller 'RegisterCtrl', ($scope, $log, $http, $location) ->
  tag = 'RegisterCtrl'

  $scope.checkEmail

  $scope.register = ->
    $log.log tag, 'register()'
    $log.log tag, 'form.$invalid:', $scope.form.$invalid
    $scope.trySubmit = true
    return $scope.user if $scope.form.$invalid

    $scope.helpMsg = '요청중...'
    $http.post '/api/users', {email: $scope.user.email, pass: $scope.user.pass}
    .success (data) ->
      $log.info tag, data
      $scope.helpMsg = '등록완료'
      $location.url('/login?tryEmail=' + data.email);
    .error (error) ->
      $log.error tag, error
      $scope.helpMsg = '등록실패'

  $scope.showError = (form, validator, trySubmit) ->
    $log.debug tag, 'showError()'
    $log.debug tag, 'form.$error[validator]', form.$error[validator]
    result = trySubmit && form.$error && form.$error[validator]
    $log.debug tag, 'result: ', result
    result
