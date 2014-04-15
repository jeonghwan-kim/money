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
      .when('/signout', {
        templateUrl: 'partials/signout',
        controller: 'SignoutCtrl'
      })
      .when('/expense/:yearMonth', {
        templateUrl: 'partials/expense',
        controller: 'ExpenseCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
  });