'use strict'

angular.module 'moneyApp'
.service 'Expense', ($resource) ->
  # AngularJS will instantiate a singleton by calling 'new' on this function


  $resource '/api/expenses/:id?month=:month&year=:year&limit=9999',
      id: '@id'
      month: '@month'
      year: '@year'
    ,
      update:
        method: 'PUT'
