'use strict'

angular.module 'moneyApp'
.controller 'NavbarCtrl', ($scope, $location, $http, $log, $state, $stateParams, Auth) ->
  $scope.menu = [
    {title: '홈', link: '/'}
    {title: '지출현황', link: '/expenses/0000/00'}
    {title: '지출입력', link: '/newExpense'}
  ]

  $scope.isCollapsed = true
  $scope.isLoggedIn = Auth.isLoggedIn
  $scope.isAdmin = Auth.isAdmin
  $scope.getCurrentUser = Auth.getCurrentUser

  $scope.isActive = (route) ->
    route is $location.path()

  $scope.logout = ->
    Auth.logout()
    $location.path '/login'
