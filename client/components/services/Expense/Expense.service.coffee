'use strict'

angular.module 'moneyApp'
.service 'Expense', ($resource) ->
  # AngularJS will instantiate a singleton by calling 'new' on this function

  tag = 'Service:Expense'

  $resource '/api/expense'