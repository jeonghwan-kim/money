'use strict'

describe 'Controller: ExpensesCtrl', ->

  # load the controller's module
  beforeEach module 'moneyApp'
  ExpensesCtrl = undefined
  scope = undefined

  # Initialize the controller and a mock scope
  beforeEach inject ($controller, $rootScope) ->
    scope = $rootScope.$new()
    ExpensesCtrl = $controller 'ExpensesCtrl',
      $scope: scope

  it 'should ...', ->
    expect(1).toEqual 1
