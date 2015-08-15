/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/logs', require('./api/log'));
  app.use('/api/expenses', require('./api/expense'));
  app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth'));

  var path = require('path');
  app.get('/storage/:type/:file', function (req, res) {
    res.sendfile(path.join(__dirname, '../../money-storage/' + req.params.type + '/' + req.params.file));
  });

  // If parameters are invalid return 400
  app.use(errors[400]);

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
