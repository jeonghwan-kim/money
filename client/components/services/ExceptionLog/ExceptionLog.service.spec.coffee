'use strict'

describe 'Service: ExceptionLog', ->

  # load the service's module
  beforeEach module 'moneyApp'

  # instantiate service
  ExceptionLog = undefined
  beforeEach inject (_ExceptionLog_) ->
    ExceptionLog = _ExceptionLog_

  it 'should do something', ->
    expect(!!ExceptionLog).toBe true