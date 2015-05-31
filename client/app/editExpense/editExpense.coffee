'use strict'

angular.module 'moneyApp'
.config ($stateProvider) ->
  $stateProvider.state 'editExpense',
    url: '/expenses/edit/:expenseId/:date/:text/:amount'
    templateUrl: 'app/editExpense/editExpense.html'
    controller: 'EditexpenseCtrl'
    resolve:
      user: (Auth) ->
        Auth.get({redirect: true})
