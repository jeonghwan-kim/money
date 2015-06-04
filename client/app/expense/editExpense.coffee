'use strict'

angular.module 'moneyApp'
.config ($stateProvider) ->
  $stateProvider
  .state 'expenses',
    url: '/expenses/:year/:month'
    templateUrl: 'app/expense/expenses/expenses.html'
    controller: 'ExpensesCtrl'
    authenticate: true
  .state 'newExpense',
    url: '/newExpense'
    templateUrl: 'app/expense/newExpense/newExpense.html'
    controller: 'NewexpenseCtrl'
    authenticate: true
  .state 'editExpense',
    url: '/expenses/edit/:expenseId/:date/:text/:amount'
    templateUrl: 'app/expense/editExpense/editExpense.html'
    controller: 'EditexpenseCtrl'
    authenticate: true
