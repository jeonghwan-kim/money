'use strict'

describe 'Controller: ResetPasswordCtrl', ->

  # load the controller's module
  beforeEach module 'moneyApp'
  ResetPasswordCtrl = undefined
  scope = undefined

  # Initialize the controller and a mock scope
  beforeEach inject ($controller, $rootScope) ->
    scope = $rootScope.$new()
    ResetPasswordCtrl = $controller 'ResetPasswordCtrl',
      $scope: scope

  it 'should ...', ->
    expect(1).toEqual 1
