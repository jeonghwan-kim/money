'use strict'

angular.module 'moneyApp'
.controller 'EditexpenseCtrl', ($scope, $stateParams, $state, $window, Expense) ->
  expense = $scope.expense =
    date: new Date $stateParams.date
    text: $stateParams.text
    amount: parseInt $stateParams.amount, 10

  year = expense.date.getFullYear()
  month = ((date) ->
    month = date.getMonth() + 1
    if month < 10 then '0' + month else month
  )(expense.date)

  $scope.showError = (form, validator) ->
    form.$error && form.$error[validator]

  $scope.save = ->
    return if $scope.form.$invalid
    Expense.update({id: $stateParams.expenseId}, expense)
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
