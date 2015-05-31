'use strict'

angular.module 'moneyApp'
.controller 'MainCtrl', ($scope, $log, $http, $state, user) ->
  tag = 'MainCtrl'
  $scope.user = user
  $log.debug tag, user
  $scope.awesomeThings = [
    {name: '지출현황', link: '/expenses/0000/00'}
    {name: '지출입력', link: '/newExpenses'}
  ]




