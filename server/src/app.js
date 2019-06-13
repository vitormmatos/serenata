var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var user = require('./routes/user.js');
var index = require('./routes/index.js');
var app = express();
var router = express.Router();
var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);

app.use(session({
	secret: 'hakuna matata',
	resave: true,
	saveUninitialized: true,
	cookie: { maxAge: 60000 }
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', router);

// Database connection
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'password',
	database: 'serenata'
});

connection.connect();
// Global connection object
global.db = connection;

// Function that executes sql queries
function execSQLQuery(sqlQry, res){
  connection.query(sqlQry, function(error, results, fields){
      if(error) 
        res.json(error);
      else
        res.json(results);
      connection.end();
      console.log('executou!');
  });
}

/*
* Routes
*/
router.get('/', (req, res) => res.json({ message: 'Funcionando!' }));
router.get('/login', function (request, response) {
	response.sendFile(path.join(__dirname + '/views/login.html'));
});
router.post('/auth', user.signin);
router.get('/home', function (request, response) {
	if (request.session.loggedin) {
		response.send('Bem vindo, ' + request.session.username + '!');
	} else {
		response.send('Logue para ver esta página!');
	}
	response.end();
});

/*
* APIs
*/
// Return all users
router.get('/usuarios', (req, res) => {
	execSQLQuery('SELECT * FROM tb_usuario', res); 
});

// Return user by id
router.get('/usuarios/id/:id?', (req, res) => {
	let filter = '';
	if (req.params.id) filter = ' WHERE idt_cod_usuario=' + parseInt(req.params.id);
	execSQLQuery('SELECT * FROM tb_usuario' + filter, res);
});

// Return user by username
router.get('/usuarios/username/:username?', (req, res) => {
	let filter = '';
	if (req.params.username) filter = ' WHERE lgn_usuario="' + req.params.username + '"';
	execSQLQuery('SELECT * FROM tb_usuario' + filter, res);
});

// Insert new user
router.post('/usuarios', (req, res) => {
	const name = req.body.nme_usuario.substring(0,150);
	const username = req.body.lgn_usuario.substring(0,150);
	// Encryption of the password
	const password = bcrypt.hashSync(req.body.pss_usuario, salt);
	const email = req.body.eml_usuario; 
	execSQLQuery('INSERT INTO tb_usuario (nme_usuario, lgn_usuario, pss_usuario, eml_usuario)'
	+ `VALUES ('${name}','${username}','${password}','${email}');`, res);
})

app.listen(3000);