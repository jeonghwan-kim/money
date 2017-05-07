'use strict'

angular.module 'moneyApp'
.config ($stateProvider) ->
  $stateProvider.state 'about',
    url: '/about'
    templateUrl: 'app/about/about.html'
    controller: 'AboutCtrl'
