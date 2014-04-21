'use strict';

angular.module('moneyApp')
  .controller('MainCtrl', function ($scope, $http, $location, $cookies) {
    var sid = $.cookie('sid');

    if (sid) {
      $http.post('/api/signin2', {sid: sid})
        .success(function(data, status) {
          console.log(status);
          $location.url('/expense/' + getThisMonthString());
        })
        .error(function(data, status) {
          /**
           * 한번 호출하면 session 설정이 제대로 되지 않음.
           * 그래서 서버에서 403 반환시 한 번 더 인증 요청한다.
           */
          $http.post('/api/signin2', {sid: sid})
            .success(function() {
              $location.url('/expense/' + getThisMonthString());
              return;
            });

          console.log(status);
          $location.url('/signin');
        });
    } else {
      $location.url('/signin');
    }
  });