'use strict'

angular.module 'moneyApp'
.controller 'MainCtrl', ($scope, $log, Auth) ->
  $scope.user = Auth.getCurrentUser()



