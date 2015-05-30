'use strict'

angular.module 'moneyApp'
.config ($stateProvider) ->
  $stateProvider.state 'expenses',
    url: '/expenses'
    templateUrl: 'app/expenses/expenses.html'
    controller: 'ExpensesCtrl'
