'use strict'

angular.module 'moneyApp'
.controller 'ExpensesCtrl', ($scope, $http, $state, $stateParams, Month, Expense) ->
  $scope.names = ['날짜', '내용', '금액', '']

  requestDate = $stateParams.year + '-' + $stateParams.month
  Month.get().then (months) ->
    idx = _.findIndex months, (month) ->
      month is requestDate
    $scope.selectedDate = if idx > -1 then months[idx] else months[0]
    $scope.months = months

  parseExpense = (expenses) ->
    tmp = []
    expenses.forEach (expense) ->
      found = _.findIndex tmp, (n) ->
        n.date is moment(expense.date).format('YYYY-MM-DD')

      if found > -1
        tmp[found].expenses.push expense
        tmp[found].sum += expense.amount
      else
        tmp.push
          date: moment(expense.date).format('YYYY-MM-DD')
          expenses: [expense]
          sum: expense.amount
    tmp

  $scope.$watch 'selectedDate', (newDate) ->
    return if !newDate

    year = moment(newDate, 'YYYY-MM').format('YYYY')
    month = moment(newDate, 'YYYY-MM').format('MM')

    if year != $stateParams.year || month != $stateParams.month
      $state.go 'expenses', {year: year, month: month}
    else
      year = parseInt($stateParams.year, 10)
      month = parseInt($stateParams.month, 10)
      Expense.query year: year, month: month
      .$promise
      .then (data) ->
        $scope.sum = _.sum data, (expense) ->
          expense.amount
        $scope.expenses = parseExpense(data)
      .catch (err) ->
        console.error err

