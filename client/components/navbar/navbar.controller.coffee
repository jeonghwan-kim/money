'use strict'

angular.module 'moneyApp'
.controller 'NavbarCtrl', ($scope, $location, $http, $log, $state, $stateParams, Auth) ->
  tag = 'NavbarCtrl'

  $scope.menu = [
    {title: '홈', link: '/'}
    {title: '지출현황', link: '/expenses/0000/00'}
    {title: '지출입력', link: '/newExpense'}
  ]

  Auth.get().then (user) ->
    $scope.user = user

  $scope.isCollapsed = true

  $scope.isActive = (route) ->
    route is $location.path()

  $scope.logout = ->
    $scope.tryLogout = true

    $http.delete '/api/auth'
    .success (data) ->
      $log.info tag, 'logout', data
      $scope.tryLogout = false;
      reload();
    .error (error) ->
      $log.error tag, error
      $scope.tryLogout = false;

  reload = ->
    $state.transitionTo($state.current, $stateParams, {
      reload: true,
      inherit: false,
      notify: true
    });