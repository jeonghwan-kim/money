'use strict'

angular.module 'moneyApp'
.config ($stateProvider) ->
  $stateProvider.state 'register',
    url: '/register'
    templateUrl: 'app/register/register.html'
    controller: 'RegisterCtrl'