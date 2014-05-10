'use strict';

angular.module('moneyApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/main',
        controller: 'MainCtrl'
      })
      .when('/signup', {
        templateUrl: 'partials/signup',
        controller: 'SignupCtrl'
      })
      .when('/signin', {
        templateUrl: 'partials/signin',
        controller: 'SigninCtrl'
      })
      .when('/expense/:yearMonth', {
        templateUrl: 'partials/expense',
        controller: 'ExpenseCtrl'
      })
      .when('/new', {
        templateUrl: 'partials/new',
        controller: 'NewCtrl'
      })
      .when('/edit/:id/:date/:text/:amount', {
        templateUrl: 'partials/edit',
        controller: 'EditCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
  });