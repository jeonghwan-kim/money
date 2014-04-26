'use strict';

angular.module('moneyApp')
  .filter('noFractionCurrency', function (filter, locale) {

    var currencyFilter = filter('currency');
    var formats = locale.NUMBER_FORMATS;

    return function(amount, currencySymbol) {
      var value = currencyFilter(amount, currencySymbol);
      var sep = value.indexOf(formats.DECIMAL_SEP);
      console.log(amount, value);
      if(amount >= 0) {
        return value.substring(0, sep);
      }
      return value.substring(0, sep) + ')';
    };
  });
