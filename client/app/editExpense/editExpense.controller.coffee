'use strict'

angular.module 'moneyApp'
.controller 'EditexpenseCtrl', ($scope, $stateParams, $log, $http, $state, $window) ->
  tag = 'EditeexpenseCtrl'

  expense = $scope.expense =
    expenseId: parseInt $stateParams.expenseId, 10
    date: new Date $stateParams.date
    text: $stateParams.text
    amount: parseInt $stateParams.amount, 10


  $scope.showError = (form, validator) ->
    form.$error && form.$error[validator]

  $scope.save = ->
    return if $scope.form.$invalid
    $log.debug $scope.expense
    $http.put '/api/expenses', $scope.expense
    .success (date) ->
      $log.debug tag, date
#      $state.go 'expenses'
    .error (error) ->
      $log.error tag, error


  $scope.delete = ->
    return if !$window.confirm '정말 삭제할까요?'

    $http.delete "/api/expenses/#{ expense.expenseId }"
    .success (data) ->
      $log.debug tag, data
#      $state.go 'expense'
    .error (error) ->
      $log.error tag, error

  $scope.cancel = ->
    $state.go 'expenses', {year: 2015, month: 5}
