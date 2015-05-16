'use strict'

angular.module 'moneyApp'
.controller 'NavbarCtrl', ($scope, $location, $http, $log) ->
  tag = 'NavbarCtrl'

  $http.get '/api/auth'
  .success (data) ->
    $scope.user = data.user
  .error (error) ->
    $log.warn tag, error

  $scope.menu = [
    title: '월별 현황'
    link: '/'
  ]

  $scope.isCollapsed = true

  $scope.isActive = (route) ->
    route is $location.path()

  $scope.logout = ->
    $http.delete '/api/auth'
    .success (data) ->
      $log.info tag, 'logout', data
    .error (error) ->
      $log.error tag, error