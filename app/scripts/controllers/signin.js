'use strict';

angular.module('moneyApp')
  .controller('SigninCtrl', function ($scope, $http, $location, $cookies) {

    $scope.submit = function() {
      var url = '/api/signin';
      var data = {
        email: $scope.email,
        password: $scope.password
      };

      // 서버에 로그인 요청
      $http.post(url, data).
        success(function(data, status, headers, config) {
          // 쿠키 저장
          $.cookie('sid', data.sid.toString(), {expires: 7}); // 7일간 저장

          $location.url('/expense/' + getThisMonthString());
        }).
        error(function(data, status, headers, config) {
          $scope.msg = '아이디나 비밀번호를 다시 확인하세요.';
        });
    };
  });