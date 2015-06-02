'use strict'

angular.module 'moneyApp'
.controller 'ExpensesCtrl', ($scope, $http, $log, $stateParams) ->
  tag = 'ExpensesCtrl'

  $scope.names = ['날짜', '내용', '금액', '']

  date = $stateParams.year + '-' + $stateParams.month

  parseExpense = (expenses) ->
    tmp = {}
    expenses.forEach (expense) ->
      if tmp.hasOwnProperty(expense.date)
        tmp[expense.date].expenses.push expense
        tmp[expense.date].sum += expense.amount
      else
        tmp[expense.date] =
          date: moment(expense.date).format('YYYY-MM-DD')
          expenses: [expense]
          sum: expense.amount
    tmp

  $http.get "/api/expenses/months"
  .success (data) ->
    $scope.months = data.months
    idx = _.findIndex $scope.months, (month) ->
      month.month == date

    $scope.date = if idx > -1 then $scope.months[idx] else $scope.months[0]
  .error (error) ->
    $log.error tag, error


  $scope.$watch 'date', (newDate) ->
    return if !newDate

    year = parseInt newDate.month.split('-')[0], 10
    month = parseInt newDate.month.split('-')[1], 10

    $http.get "/api/expenses?year=#{ year }&month=#{ month }"
    .success (data) ->
      $scope.sum = _.sum data.expenses, (expense) ->
        expense.amount

      $log.debug tag, data
      expenses = $scope.expenses = parseExpense data.expenses
    .error (error) ->
      $log.error tag, error

