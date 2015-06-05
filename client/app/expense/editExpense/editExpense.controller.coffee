'use strict'

angular.module 'moneyApp'
.controller 'EditexpenseCtrl', ($scope, $stateParams, $state, $window, Expense) ->
  expense = $scope.expense =
    date: moment($stateParams.date).format 'YYYY-MM-DD'
    text: $stateParams.text
    amount: parseInt $stateParams.amount, 10

  year = moment(expense.date).format 'YYYY'
  month = moment(expense.date).format 'MM'

  $scope.save = (form) ->
    return if form.$invalid
    Expense.update id: $stateParams.expenseId, expense
    .$promise
    .then () ->
      $state.go 'expenses', {year: year, month: month}
    .catch (err) ->
      console.error err

  $scope.delete = ->
    return if !$window.confirm '정말 삭제할까요?'
    Expense.remove id: $stateParams.expenseId
    .$promise
    .then () ->
      $state.go 'expenses', {year: year, month: month}
    .catch (err) ->
      console.error err

  $scope.cancel = ->
    $state.go 'expenses', {year: year, month: month}
