'use strict';

var apiUser = require('./controllers/api-user'),
    apiExpense = require('./controllers/api-expense'),
    index = require('./controllers');

/**
 * Application routes
 */
module.exports = function(app) {

  // Server API Routes
  app.post('/api/signin', apiUser.signin);
  app.post('/api/signin2', apiUser.signin2);
  app.post('/api/signup', apiUser.signup);
  app.post('/api/signout', apiUser.signout);
  app.get('/api/expense/:yearMonth', apiExpense.listExpense);
  app.post('/api/expense', apiExpense.insertExpense);
  app.delete('/api/expense/:id', apiExpense.deleteExpense);
  // app.get('/api/yearmonth', api.yearmonth);


  // All undefined api routes should return a 404
  app.get('/api/*', function(req, res) {
    res.send(404);
  });


  // All other routes to use Angular routing in app/scripts/app.js
  app.get('/partials/*', index.partials);
  app.get('/*', index.index);
};