'use strict'

describe 'Service: Expense', ->

  # load the service's module
  beforeEach module 'moneyApp'

  # instantiate service
  Expense = undefined
  beforeEach inject (_Expense_) ->
    Expense = _Expense_

  it 'should do something', ->
    expect(!!Expense).toBe true
