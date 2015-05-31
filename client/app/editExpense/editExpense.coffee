'use strict'

angular.module 'moneyApp'
.config ($stateProvider) ->
  $stateProvider.state 'editExpense',
    url: '/expenses/edit/:expenseId/:date/:text/:amount'
    templateUrl: 'app/editExpense/editExpense.html'
    controller: 'EditexpenseCtrl'
