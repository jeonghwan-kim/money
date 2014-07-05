'use strict';

angular.module('moneyApp')
  .directive('focusMe', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        element[0].focus();
      }
    };
  });
