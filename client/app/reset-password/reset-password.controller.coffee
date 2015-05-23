'use strict'

angular.module 'moneyApp'
.controller 'ResetPasswordCtrl', ($scope, $http) ->
  initMsg = ->
    prePassword: '기존 비밀번호를 입력'
    newPassword1: '새로운 비밀번호 입력'
    newPassword2: '새로운 비밀번호 재입력'
    submit: ''

  resetPassword = (prePassword, newPassword) ->
    $http.put '/api/users', {prePassword: prePassword, newPassword: newPassword}

  $scope.msg = initMsg()

  $scope.resetPassword = ->
    $scope.msg = initMsg()
    $scope.trySubmit = true
    return if $scope.form.$invalid
    return $scope.msg.submit = '새로운 비밀번호를 모두 동일하게 입력하세요' if $scope.newPassword1 != $scope.newPassword2

    $scope.tryReset = true
    resetPassword $scope.prePassword, $scope.newPassword1
    .then (data) ->
      $scope.tryReset = false
      $scope.resetSuccess = true
    , (error) ->
      $scope.msg.submit = '비밀번호 변경 실패'

  $scope.showError = (form, validator, trySubmit) ->
    trySubmit && form.$error && form.$error[validator]

