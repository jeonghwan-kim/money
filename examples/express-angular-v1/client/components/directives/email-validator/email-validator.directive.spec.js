// Generated by CoffeeScript 1.9.2
(function() {
  'use strict';
  describe('Directive: emailValidator', function() {
    var element, scope;
    beforeEach(module('moneyApp'));
    element = void 0;
    scope = void 0;
    beforeEach(inject(function($rootScope) {
      return scope = $rootScope.$new();
    }));
    return it('should make hidden element visible', inject(function($compile) {
      element = angular.element('<email-validator></email-validator>');
      element = $compile(element)(scope);
      return expect(element.text()).toBe('this is the emailValidator directive');
    }));
  });

}).call(this);

//# sourceMappingURL=email-validator.directive.spec.js.map
