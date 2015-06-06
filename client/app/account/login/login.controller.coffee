'use strict'

angular.module 'moneyApp'
.controller 'LoginCtrl', ($scope, $location, Auth) ->

  $scope.user = {}
  $scope.errors = {}

  $scope.login = () ->
    $scope.submitted = true
    $scope.errors = {}
    return if $scope.form.$invalid

    $scope.try = true
    Auth.login
      email: $scope.user.email
      password: $scope.user.password
    .then ->
      delete $scope.try
      $location.path '/'
    .catch (err) ->
      delete $scope.try
      $scope.errors.other = '인증실패. 다시 시도하세요.'
