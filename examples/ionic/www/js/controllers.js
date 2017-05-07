angular.module('starter.controllers', [])

.controller('MainCtrl', function($scope, $state, $ionicListDelegate, Expense) {
  Expense.get().then(function (data) {
    $scope.expenses = data;
  });

  $scope.remove = function (expense) {
    $ionicListDelegate.showDelete(true);
    Expense.remove(expense);
  };

  $scope.goEdit = function (expense) {
    $ionicListDelegate.closeOptionButtons();
    $state.go('tab.edit', {expense: expense});
  }
})

.controller('MainEditCtrl', function($scope, $state, $stateParams, Expense) {
  console.log('MainEditCtrl', $stateParams);

  $scope.expense = $stateParams.expense;

  $scope.edit = function () {
    Expense.update($scope.expense).then(function () {
      $state.go('tab.main')
    })
  };
})

.controller('AddCtrl', function($scope, $state, Expense) {
  $scope.expense = {
    text: '',
    amount: null,
    date: moment(new Date()).format('YYYY-MM-DD')
  };

  $scope.add = function () {
    Expense.create($scope.expense)
        .then(function () {
          $state.go('tab.main', {}, {reload: true})
        });
  }
})

.controller('AccountCtrl', function($scope, $cookies, $state) {
  $scope.logout = function () {
    $cookies.remove('token');
    $state.go('login')
  };
})

.controller('LoginCtrl', function($scope, $state, BackendApi, Auth, $cookies) {
  $scope.goRegister = function () {
    $state.go('register');
  };

  $scope.account = {
    email: '',
    password: ''
  };

  $scope.login = function () {
    BackendApi.login($scope.account)
        .then(function loginSuccess(res) {
          console.log(res);
          $cookies.put ('token', res.data.token);
          $state.go('tab.add')
        })
        .catch(function loginError(res) {
          console.error(res);
          $scope.errors = res;
        })
  };
})

.controller('RegisterCtrl', function($scope, $state, BackendApi) {
  $scope.account = {
    email: '',
    password: ''
  };

  $scope.register = function () {
    BackendApi.register($scope.account)
        .then(function registerSuccess(res) {
          console.log(res);
          $state.go('login')
        })
        .catch(function registerError(res) {
          console.error(res);
          $scope.errors = res.data;
        })
  };

});
