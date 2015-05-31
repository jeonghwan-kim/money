'use strict'

angular.module 'moneyApp'
.factory 'Auth', ($http, $q, $state, $log) ->
  # AngularJS will instantiate a singleton by calling 'new' on this function
  tag = 'Service:Auth'

  get = (args) ->
    deferred = $q.defer()
    $http.get '/api/auth'
    .success (data) ->
      $log.debug tag, data.user
      deferred.resolve data.user
    .error (error) ->
      $log.warn tag, error
      deferred.reject error
      $state.go 'login' if args && args.redirect
    deferred.promise

  # Public API here
  (->
    get: get)()