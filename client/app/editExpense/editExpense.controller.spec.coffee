'use strict'

describe 'Controller: EditexpenseCtrl', ->

  # load the controller's module
  beforeEach module 'moneyApp'
  EditexpenseCtrl = undefined
  scope = undefined

  # Initialize the controller and a mock scope
  beforeEach inject ($controller, $rootScope) ->
    scope = $rootScope.$new()
    EditexpenseCtrl = $controller 'EditexpenseCtrl',
      $scope: scope

  it 'should ...', ->
    expect(1).toEqual 1
