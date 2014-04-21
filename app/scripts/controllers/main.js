'use strict';

angular.module('moneyApp')
  .controller('MainCtrl', function ($scope, $http, $location, $cookies) {
    var sid = $.cookie('sid');

    if (sid) {
      $http.post('/api/signin2', {sid: sid})
        .success(function() {
          $location.url('/expense/' + getThisMonthString());
        })
        .error(function() {
          $location.url('/signin');
        });
    } else {
      $location.url('/signin');
    }
  });