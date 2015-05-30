'use strict'

angular.module 'moneyApp'
.controller 'ExpensesCtrl', ($scope, $http, $log, $stateParams) ->
  tag = 'ExpensesCtrl'

  year = $scope.year = $stateParams.year
  month = $scope.month = $stateParams.month

  $scope.names = ['날짜', '내용', '금액', '']

  $http.get "/api/expenses?year=#{ year }&month=#{ month }"
  .success (data) ->
    expenses = $scope.expenses = data.expenses
    $scope.sum = _.sum expenses, (item) ->
      item.amount
    $log.debug tag, expenses
  .error (error) ->
    $log.error tag, error

