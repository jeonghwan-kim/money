'use strict'

describe 'Controller: LogoutCtrl', ->

  # load the controller's module
  beforeEach module 'moneyApp'
  LogoutCtrl = undefined
  scope = undefined

  # Initialize the controller and a mock scope
  beforeEach inject ($controller, $rootScope) ->
    scope = $rootScope.$new()
    LogoutCtrl = $controller 'LogoutCtrl',
      $scope: scope

  it 'should ...', ->
    expect(1).toEqual 1
