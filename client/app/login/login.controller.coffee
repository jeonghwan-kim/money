'use strict'

angular.module 'moneyApp'
.controller 'LoginCtrl', ($scope, $log, $location) ->
  $scope.email = $location.search().tryEmail