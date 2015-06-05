'use strict'

describe 'Directive: datepicker', ->

  # load the directive's module and view
  beforeEach module 'moneyApp'
  beforeEach module 'components/directives/datepicker/datepicker.html'
  element = undefined
  scope = undefined
  beforeEach inject ($rootScope) ->
    scope = $rootScope.$new()

  it 'should make hidden element visible', inject ($compile) ->
    element = angular.element '<datepicker></datepicker>'
    element = $compile(element) scope
    scope.$apply()
    expect(element.text()).toBe 'this is the datepicker directive'

