'use strict'

angular.module 'moneyApp'
.controller 'NewexpenseCtrl', ($scope, $http, $state) ->

  $scope.expense =
    date: moment(new Date()).format 'YYYY-MM-DD'
  $scope.errors = {}

  $scope.save = (form) ->
    $scope.sumitted = true
    return if form.$invalid

    payload = _.clone $scope.expense
    payload.date = moment(payload.date).format('YYYY-MM-DD')
    $http.post '/api/expenses', payload
    .success () ->
      year = moment($scope.expense.date).format 'YYYY'
      month = moment($scope.expense.date).format 'MM'
      $state.go('expenses', {year: year, month: month})
    .error (error) ->
      $scope.errors.other = '입력실패'

