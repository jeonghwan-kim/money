'use strict'

angular.module 'moneyApp'
.config ($stateProvider) ->
  $stateProvider.state 'logout',
    url: '/logout'
    templateUrl: 'app/logout/logout.html'
    controller: 'LogoutCtrl'
