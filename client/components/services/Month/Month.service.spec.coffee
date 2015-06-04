'use strict'

describe 'Service: Month', ->

  # load the service's module
  beforeEach module 'moneyApp'

  # instantiate service
  Month = undefined
  beforeEach inject (_Month_) ->
    Month = _Month_

  it 'should do something', ->
    expect(!!Month).toBe true