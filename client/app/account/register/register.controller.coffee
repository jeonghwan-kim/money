'use strict'

angular.module 'moneyApp'
.controller 'RegisterCtrl', ($scope, $http, $location) ->

  $scope.checkEmail

  $scope.register = ->
    $scope.trySubmit = true
    return $scope.user if $scope.form.$invalid

    $scope.helpMsg = '요청중...'
    $http.post '/api/users', {email: $scope.user.email, pass: $scope.user.pass}
    .success (data) ->
      $scope.helpMsg = '등록완료'
      $location.url('/login?tryEmail=' + data.email);
    .error (error) ->
      if error.name == 'SequelizeUniqueConstraintError'
        $scope.helpMsg = '이미 등록된 이메일'
      else
        $scope.helpMsg = '등록실패'

  $scope.showError = (form, validator, trySubmit) ->
    trySubmit && form.$error && form.$error[validator]
