'use strict';

angular.module('moneyApp')
  .controller('SignupCtrl', function ($scope, $http, $location) {

    $scope.submit = function() {
      var url = '/api/signup';
      var data = {
        email: $scope.email,
        password: $scope.password
      };

      // // 서버에 로그인 요청
      $http.post(url, data).
        success(function(data, status, headers, config) {
          $location.url('/signin');
        }).
        error(function(data, status, headers, config) {
          $scope.msg = '이미 등록된 이메일 주소입니다.';
        });
    };
  });