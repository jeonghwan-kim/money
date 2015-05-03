'use strict'

angular.module 'moneyApp'
.controller 'NavbarCtrl', ($scope, $location) ->
  $scope.menu = [
    title: '월별 현황'
    link: '/'
  ]
  $scope.isCollapsed = true

  $scope.isActive = (route) ->
    route is $location.path()