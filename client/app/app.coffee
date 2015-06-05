'use strict'

angular.module 'moneyApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap'
]
.config ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) ->
  $urlRouterProvider
  .otherwise '/'

  $locationProvider.html5Mode true
  $httpProvider.interceptors.push 'authInterceptor'

  $stateProvider
  .state 'main',
    url: '/'
    templateUrl: 'app/expense/expenses/expenses.html'
    controller: 'ExpensesCtrl'
    authenticate: true

.factory 'authInterceptor', ($rootScope, $q, $cookieStore, $location) ->
  # Add authorization token to headers
  request: (config) ->
    config.headers = config.headers || {}
    # https://tools.ietf.org/html/rfc6750#page-5
    config.headers.Authorization = 'Bearer ' + $cookieStore.get('token') if $cookieStore.get('token')
    config

  # Intercept 401s and redirect you to login
  responseError: (response) ->
    if response.status == 401
      $location.path('/login')
      # remove any stale tokens
      $cookieStore.remove 'token'
      $q.reject response
    else
      $q.reject response

.run ($rootScope, $location, Auth) ->
  # Redirect to login if route requires auth and you're not logged in
  $rootScope.$on '$stateChangeStart', (event, next) ->
    Auth.isLoggedInAsync (loggedIn) ->
      if next.authenticate && !loggedIn
        event.preventDefault()
        $location.path '/login'

