'use strict'

angular.module 'moneyApp'
.controller 'NewexpenseCtrl', ($scope, $http, $state, FileUploader) ->

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


  $scope.uploader = new FileUploader
    url: '/api/images'

  $scope.uploader.onBeforeUploadItem = (item) ->
    data = angular.element('canvas')[0].toDataURL()
    console.log data
#    console.log(canvas[0].toDataURL())
