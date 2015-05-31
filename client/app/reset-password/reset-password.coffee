'use strict'

angular.module 'moneyApp'
.config ($stateProvider) ->
  $stateProvider.state 'reset-password',
    url: '/reset-password'
    templateUrl: 'app/reset-password/reset-password.html'
    controller: 'ResetPasswordCtrl'
    resolve:
      user: (Auth) ->
        Auth.get({redirect: true})
