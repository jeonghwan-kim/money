'use strict'

angular.module 'moneyApp'
.directive 'datepicker', ->
  templateUrl: 'components/directives/datepicker/datepicker.html'
  restrict: 'EA',
  require: 'ngModel',
  link: (scope, element, attrs, ctrl) ->
    input = element.find('.datepicker').eq(0).pickadate({
      format: 'yyyy-mm-dd'
    })
    picker = input.pickadate 'picker'
    picker.set 'select', ctrl.$modelValue, format: 'yyyy-mm-dd'
    picker.on
      set: (data) ->
        return if data.hasOwnProperty 'highlight'
        date = moment(data.select).format 'YYYY-MM-DD'
        ctrl.$setViewValue date
        picker.close();

    ctrl.$parsers.push (value) ->
      ctrl.$setViewValue value
      value

    ctrl.$formatters.push (value) ->
      ctrl.$setViewValue value
      value
