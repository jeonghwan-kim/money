'use strict';

angular.module('moneyApp')
  .controller('MainCtrl', function ($scope, $http, $location, $cookies) {
    var uid = $.cookie('uid');

    if (uid) {
      $http.post('/api/signin2', {uid: uid}).success(function() {
        $location.url('/expense/' + getThisMonthString());
      })
    } else {
      $location.url('/signin');
    }
  });