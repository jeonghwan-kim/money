'use strict'

angular.module 'moneyApp'
.directive 'emailValidator', ->
  EMAIL_REGEXP = /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9!#$%&'*+/=?^_`{|}~.-]+\.[a-z0-9!#$%&'*+/=?^_`{|}~.-]+/

  require: 'ngModel'
  restrict: ''
  link: (scope, elm, attrs, ctrl) ->
    if (ctrl && ctrl.$validators.email)
      ctrl.$validators.email = (modelValue) ->
        EMAIL_REGEXP.test modelValue

