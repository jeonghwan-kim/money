'use strict'

angular.module 'moneyApp'
.controller 'MainCtrl', ($scope, $log, $http, $state) ->
  tag = 'MainCtrl'

  $http.get '/api/auth'
  .success (data) ->
    $log.debug tag, data
  .error (error) ->
    $log.warn tag, error
    $state.go 'login'





