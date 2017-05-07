'use strict'

angular.module 'moneyApp'
.controller 'NavbarCtrl', ($scope, $location, $http, $log, $state, $stateParams, Auth) ->

  $scope.isLoggedIn = Auth.isLoggedIn
  $scope.isAdmin = Auth.isAdmin
  $scope.getCurrentUser = Auth.getCurrentUser

  $scope.isActive = (route) ->
    route is $location.path()

  $scope.logout = ->
    Auth.logout()
    $location.path '/login'

