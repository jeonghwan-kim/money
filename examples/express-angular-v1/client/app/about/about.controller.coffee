'use strict'

angular.module 'moneyApp'
.controller 'AboutCtrl', ($scope) ->
  $scope.versions = [{
    version: '0.1.0',
    updates: [
      'PHP 버전'
    ]
  }, {
    version: '1.0.0',
    updates: [
      'NODE.JS 버전'
    ]
  }, {
    version: '1.1.0',
    updates: [
      'ANGULAR.JS 적용'
    ]
  }, {
    version: '1.1.1',
    updates: [
      '로그인 정보를 쿠키와 세션에 저장'
    ]
  }, {
    version: '1.2.0',
    updates: [
      '편집기능 추가'
    ]
  }, {
    version: '2.0.0',
    updates: [
      'ANGULAR-FULLSTACK 2 버전'
    ]
  }, {
    version: '2.1.0',
    updates: [
      'MATERIALZIE 적용'
    ]
  }, {
    version: '2.1.1',
    updates: [
      '오타수정',
      '토큰 만료시간 설정'
    ]
  }, {
    version: '2.1.2',
    updates: [
      'datepicker 클릭 이벤트 버그 수정'
    ]
  }, {
    version: '2.1.3',
    updates: [
      '비용 데이터 리밋 갯수 변경'
    ]
  }]