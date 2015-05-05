'use strict'

angular.module 'moneyApp'
.config ($stateProvider) ->
  $stateProvider.state 'forgot-password',
    url: '/forgot-password'
    templateUrl: 'app/forgot-password/forgot-password.html'
    controller: 'ForgotPasswordCtrl'
