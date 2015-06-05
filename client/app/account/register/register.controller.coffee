'use strict'

angular.module 'moneyApp'
.controller 'RegisterCtrl', ($scope, $http) ->

  $scope.user = {}
  $scope.errors = {}

  $scope.register = (form) ->
    $scope.submitted = true
    return if form.$invalid

    $http.post '/api/users', {email: form.email.$modelValue, password: form.password.$modelValue}
    .success (data) ->
      $scope.registerd = true
    .error (error) ->
      if error.name is 'SequelizeUniqueConstraintError'
        $scope.errors.other = '이미 등록된 이메일입니다.'
      else
        $scope.errors.other = '등록에 실패하였습니다.'

