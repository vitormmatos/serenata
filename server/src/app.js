const express = require('express')
, session = require('express-session')
, bodyParser = require('body-parser')
, path = require('path')
, user = require('./routes/user.js')
, index = require('./routes/index.js')
, app = express()
, bcrypt = require('bcrypt')
, salt = bcrypt.genSaltSync(10)
, pool = require('./config/pool-factory')
, connectionMiddleware = require('./config/connection-middleware');

app.use(connectionMiddleware(pool));
app.use((err, req, res, next) => {
    console.error(err.stack);
	res.status(500).json({ error: err.toString() });
});
app.use(session({
	secret: 'hakuna matata',
	resave: true,
	saveUninitialized: true,
	cookie: { maxAge: 60000 }
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/*
* Routes
*/
app.get('/', (req, res) => res.json({ message: 'Funcionando!' }));
app.get('/login', function (request, response) {
	response.sendFile(path.join(__dirname + '/views/login.html'));
});
app.post('/auth', user.signin);
app.get('/home', function (request, response) {
	if (request.session.loggedin) {
		response.send('Bem vindo, ' + request.session.username + '!');
	} else {
		response.send('Logue para ver esta página!');
	}
});

/*
* APIs
*/
// -------------- Usuário --------------- //
app.get('/usuarios', (req, res) => {
	req.connection.query('SELECT * FROM tb_usuario', (err, results) => {
		if(err) return next(err);
		res.json(results);
	});
});

app.get('/usuarios/:id?', (req, res) => {
	let filter = '';
	if (req.params.id) filter = ' WHERE idt_cod_usuario=' + parseInt(req.params.id);
	req.connection.query('SELECT * FROM tb_usuario' + filter, (err, results) => {
		if(err) return next(err);
		res.json(results);
	});
});

app.get('/usuarios/username/:username?', (req, res) => {
	let filter = '';
	if (req.params.username) filter = ' WHERE lgn_usuario="' + req.params.username + '"';
	execSQLQuery('SELECT * FROM tb_usuario' + filter, (err, results) => {
		if(err) return next(err);
		res.json(results);
	});
});

app.post('/usuarios', (req, res) => {
	const name = req.body.nme_usuario.substring(0,150);
	const username = req.body.lgn_usuario.substring(0,150);
	// Encryption of the password
	const password = bcrypt.hashSync(req.body.pss_usuario, salt);
	const email = req.body.eml_usuario; 
	execSQLQuery('INSERT INTO tb_usuario (nme_usuario, lgn_usuario, pss_usuario, eml_usuario)'
	+ `VALUES ('${name}','${username}','${password}','${email}');`, (err, results) => {
		if(err) return next(err);
		res.json(results);
	});
});

app.patch('/usuarios/:id', (req, res) => {
	const id = parseInt(req.params.id)
	const name = req.body.nme_usuario.substring(0,150);
	const username = req.body.lgn_usuario.substring(0,150);
	// Encryption of the password
	const password = bcrypt.hashSync(req.body.pss_usuario, salt);
	const email = req.body.eml_usuario; 
	req.connection.query(`UPDATE tb_usuario SET nme_usuario = '${name}', lgn_usuario = '${username}', pss_usuario = '${password}',`
	+` eml_usuario = '${email}' WHERE idt_cod_usuario = ${id}`, (err, results) => {
		if(err) return next(err);
		res.json(results);
	});
});

app.listen(3000);