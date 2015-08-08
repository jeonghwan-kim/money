'use strict'

angular.module 'moneyApp'
.factory 'Constants', () ->
  cookieExpires = ->
    moment().add(3, 'months').toDate()


  cookieExpires: cookieExpires
