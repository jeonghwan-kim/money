'use strict'

angular.module 'moneyApp'
.config ($stateProvider) ->
  $stateProvider.state 'expenses',
    url: '/expenses/:year/:month'
    templateUrl: 'app/expenses/expenses.html'
    controller: 'ExpensesCtrl'
