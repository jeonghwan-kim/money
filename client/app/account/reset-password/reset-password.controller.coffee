'use strict'

angular.module 'moneyApp'
.controller 'ResetPasswordCtrl', ($scope, $http, Auth) ->
  $scope.errors = {}

  $scope.resetPassword = (form) ->
    $scope.errors = {}
    $scope.submitted = true
    return if form.$invalid
    if form.newPassword1.$modelValue != form.newPassword2.$modelValue
      return $scope.errors.other = '새로운 비밀번호를 모두 동일하게 입력하세요'

    $http.put '/api/users/me/profile', {password: form.newPassword1.$modelValue}
    .then () ->
      $scope.finished = true
      Auth.logout()
    , () ->
      $scope.errors.other = '비밀번호 변경 실패'

  $scope.showError = (form, validator, trySubmit) ->
    trySubmit && form.$error && form.$error[validator]

