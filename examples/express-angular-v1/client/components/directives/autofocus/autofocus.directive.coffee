'use strict'

angular.module 'moneyApp'
.directive 'autofocus', ($timeout) ->
  restrict: 'A'
  link: (scope, element, attrs) ->
    element[0].focus()