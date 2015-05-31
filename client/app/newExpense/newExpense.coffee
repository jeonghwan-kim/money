'use strict'

angular.module 'moneyApp'
.config ($stateProvider) ->
  $stateProvider.state 'newExpense',
    url: '/newExpense'
    templateUrl: 'app/newExpense/newExpense.html'
    controller: 'NewexpenseCtrl'
    resolve:
      user: (Auth) ->
        Auth.get()
