'use strict';

angular.module('moneyApp')
  .controller('SignoutCtrl', function ($scope, $http, $location, $cookies) {
    // 쿠키 삭제
    $cookies.uid = undefined;

    // 세션 삭제 요청
    $http.post('/api/signout').success(function() {
      $location.url('/login');
    });
  });