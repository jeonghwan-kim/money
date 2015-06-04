'use strict'

angular.module 'moneyApp'
.controller 'ForgotPasswordCtrl', ($scope, $http, $log) ->
  tag = 'ForgotPasswordCtrl'
  $scope.msg = '등록한 이메일을 입력하세요. 초기화된 비밀번호가 이메일로 발송됩니다.'

  $scope.resetPassword = ->
    $scope.trySubmit = true
    initHelpMsg();

    return if $scope.form.$invalid

    $scope.helpMsg = '초기화 중...'
    resetPassword($scope.email)
    .then (results) ->
      $scope.helpMsg = '비밀번호가 초기화 되었습니다. 이메일을 확인해 주세요' if results.status == 200



  $scope.showError = (form, validator, trySubmit) ->
    trySubmit && form.$error && form.$error[validator]

  initHelpMsg = ->
    $scope.helpMsg = '';

  resetPassword = (email) ->
    return $http.put '/api/auth', {email: email}