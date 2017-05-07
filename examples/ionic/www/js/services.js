angular.module('starter.services', [])

.factory('yearMonth', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var data = [
    {year: 2016, month: 7, expense: 1200000},
    {year: 2016, month: 6, expense: 1250000},
    {year: 2016, month: 5, expense: 1300000},
  ];

  return {
    query: function() {
      return data;
    }
  };
})

.factory('expenses', function () {
  var data = [
    {id: 1, date: Date.now(), text: '화장품', amount: 35000},
    {id: 2, date: Date.now(), text: '부식', amount: 5000},
    {id: 3, date: Date.now(), text: '커피', amount: 3500},
    {id: 4, date: Date.now(), text: '수박', amount: 15000},
    {id: 5, date: Date.now(), text: '택시', amount: 25000},
    {id: 6, date: Date.now(), text: '용돈', amount: 100000},
  ];

  return {
    query: function () {
      return data;
    },

    remove: function (id) {
      var idx = data.findIndex(function (d) {
        return d.id === id;
      });

      angular.copy(data, data.splice(idx, 1));
    }
  }
})

.factory('BackendApi', function ($http, Auth) {
  // var host = 'http://localhost:9000/api';
  var host = '';

  return {
    register: function (account) {
      console.log(account);
      return $http({
        method: 'post',
        url: host + '/api/users',
        data: account
      });
    },

    login: function (account) {
      return $http({
        method: 'post',
        url: host + '/auth/local',
        data: account
      });
    },

    queryExpenses: function (year, month) {
      return $http({
        method: 'get',
        url: host + '/api/expenses?year=' + year + '&month=' + month,
        headers: {
          Authorization: 'Bearer ' + Auth.getAccessToken()
        }
      });
    },

    create: function (expense) {
      console.log(expense)
      return $http({
        method: 'post',
        url: host + '/api/expenses',
        data: expense
      });
    }
  };
})

.factory('Auth', function () {
  var accessToken;

  return {
    getAccessToken: function (){
      return accessToken;
    },
    setAccessToken: function (token) {
      accessToken = token;
    }
  };
})

.factory('Expense', function ($http) {
  var storage = {
    expenses: [],

    get: function () {
      return $http({
        method: 'get',
        url: '/api/expenses?year=2016&month=8',
      }).then(function (res) {
        storage.expenses = res.data;
        return storage.expenses;
      });
    },

    create: function (expense) {
      return $http({
        method: 'post',
        url: '/api/expenses',
        data: expense,
      }).then(function (res) {
        storage.expenses.push(res.data);
        return storage.expenses;
      });
    },

    update: function (expense) {
      return $http({
        method: 'put',
        url: '/api/expenses/' + expense.id,
        data: expense,
      });
    },

    remove: function (expense) {
      return $http({
        method: 'delete',
        url: '/api/expenses/' + expense.id
      }).then(function (res) {
        console.log(res);
        storage.expenses.splice(storage.expenses.indexOf(expense), 1);
      });
    }
  };

  return storage;

})
