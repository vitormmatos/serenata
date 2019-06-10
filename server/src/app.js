var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var user =  require('./routes/user.js');
var index = require('./routes/index.js');
var app = express();

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'password',
	database: 'serenata'
});

connection.connect();
global.db = connection;

app.use(session({
	secret: 'hakuna matata',
	resave: true,
	saveUninitialized: true,
	cookie: { maxAge: 60000 }
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/login', function (request, response) {
	response.sendFile(path.join(__dirname + '/views/login.html'));
});

app.get('/login', index.login);
app.post('/auth', user.signin);

app.get('/home', function (request, response) {
	if (request.session.loggedin) {
		response.send('Bem vindo, ' + request.session.username + '!');
	} else {
		response.send('Logue para ver esta página!');
	}
	response.end();
});

app.listen(3000);