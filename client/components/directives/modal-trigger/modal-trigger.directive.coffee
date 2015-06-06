'use strict'

angular.module 'moneyApp'
.directive 'modalTrigger', ->
  restrict: 'A'
  link: (scope, element, attrs) ->
    element.leanModal()
