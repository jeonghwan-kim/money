'use strict'

describe 'Controller: NewexpenseCtrl', ->

  # load the controller's module
  beforeEach module 'moneyApp'
  NewexpenseCtrl = undefined
  scope = undefined

  # Initialize the controller and a mock scope
  beforeEach inject ($controller, $rootScope) ->
    scope = $rootScope.$new()
    NewexpenseCtrl = $controller 'NewexpenseCtrl',
      $scope: scope

  it 'should ...', ->
    expect(1).toEqual 1
