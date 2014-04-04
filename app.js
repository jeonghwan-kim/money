
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var expense = require('./routes/expense');
var http = require('http');
var path = require('path');

var app = express();
var sessionStore = new express.session.MemoryStore();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('ej88ej'));
app.use(express.session({
	store: sessionStore,
	secret: 'mysecret'
}));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/signin', function (req, res) {
	res.render('sign-in');
});
app.post('/signin', user.signin);
app.get('/signup', function (req, res) {
	res.render('sign-up');
});
app.post('/signup', user.signup);
app.get('/session', function (req, res) {
	req.session.foo = 'start';
	res.send(req.session);
});
app.get('/expense/:uid/:yearMonth', expense.listExpense);
app.post('/expense', expense.insertExpense);
app.delete('/expense', expense.deleteExpense);





http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
