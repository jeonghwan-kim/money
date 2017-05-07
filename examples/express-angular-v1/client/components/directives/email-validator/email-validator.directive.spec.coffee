'use strict'

describe 'Directive: emailValidator', ->

  # load the directive's module
  beforeEach module 'moneyApp'
  element = undefined
  scope = undefined
  beforeEach inject ($rootScope) ->
    scope = $rootScope.$new()

  it 'should make hidden element visible', inject ($compile) ->
    element = angular.element '<email-validator></email-validator>'
    element = $compile(element) scope
    expect(element.text()).toBe 'this is the emailValidator directive'
