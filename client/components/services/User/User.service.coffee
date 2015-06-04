'use strict'

angular.module 'moneyApp'
.factory 'User', ($resource) ->
  $resource '/api/users/:id/:controller', {id: '@id'},
    get:
      mothod: 'GET'
      params:
        id: 'me'
