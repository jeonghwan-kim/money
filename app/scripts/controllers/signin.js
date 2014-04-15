'use strict';

angular.module('moneyApp')
  .controller('SigninCtrl', function ($scope, $http) {
    console.log('signin controller');

    $scope.submit = function() {
      console.log($scope.email, $scope.password);
      var url = '/api/signin';
      var data = {
        email: $scope.email,
        password: $scope.password
      };

      // 서버에 로그인 요청
      $http.post(url, data).success(function(data) {
        console.log(data);
        if (data.uid === -1) {
          // 로그인 실패

        } else {
          // 페이지 이동
          // '/expense/2014-04'
        }''

      });

    };
  });