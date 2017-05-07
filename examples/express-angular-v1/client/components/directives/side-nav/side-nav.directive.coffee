'use strict'

angular.module 'moneyApp'
.directive 'sideNav', ->
  restrict: 'A'
  link: (scope, element, attrs) ->
    element.find('.button-collapse').eq(0).sideNav
      edge: 'left'

    angular.forEach element.find('#nav-mobile > li > a'), (value) ->
      angular.element(value).on 'click', ->
        element.find('.button-collapse').eq(0).sideNav 'hide'