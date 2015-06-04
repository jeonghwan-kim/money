'use strict'

angular.module 'moneyApp'
.factory 'Month', ($http, $q) ->

  get = () ->
    deferred = $q.defer()

    $http.get "/api/expenses/months"
    .success (data) ->
      deferred.resolve data
    .error (err) ->
      deferred.reject err

    deferred.promise


  get: get
