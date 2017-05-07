'use strict'

angular.module 'moneyApp'
.config ($stateProvider) ->
  $stateProvider
  .state 'login',
    url: '/login'
    templateUrl: 'app/account/login/login.html'
    controller: 'LoginCtrl'
  .state 'register',
    url: '/register'
    templateUrl: 'app/account/register/register.html'
    controller: 'RegisterCtrl'
  .state 'reset-password',
    url: '/reset-password'
    templateUrl: 'app/account/reset-password/reset-password.html'
    controller: 'ResetPasswordCtrl'
    authenticate: true
  .state 'forgot-password',
    url: '/forgot-password'
    templateUrl: 'app/account/forgot-password/forgot-password.html'
    controller: 'ForgotPasswordCtrl'