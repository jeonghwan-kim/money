'use strict'

angular.module 'moneyApp'
.controller 'ForgotPasswordCtrl', ($scope, $http) ->

  $scope.resetPassword = (form) ->
    $scope.submitted = true
    return if form.$invalid

    $scope.try = true
    $http.put '/auth/local', {email: form.email.$modelValue}
    .success () ->
      $scope.finished = true
      delete $scope.try
