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
app.get('/usuarios/:id?', (req, res) => {
	let filter = '';
	const id = parseInt(req.params.id);
	if (req.params.id) filter = ' WHERE idt_cod_usuario = ?';
	req.connection.query('SELECT * FROM tb_usuario' + filter, [id], (err, results) => {
		if (err) return next(err);
		res.json(results);
	});
});

app.get('/usuarios/username/:username?', (req, res) => {
	let filter = '';
	let username = req.params.username
	if (req.params.username) filter = ' WHERE lgn_usuario = ?';
	req.connection.query('SELECT * FROM tb_usuario' + filter, [username], (err, results) => {
		if (err) return next(err);
		res.json(results);
	});
});

app.post('/usuarios', (req, res) => {
	const name = req.body.nme_usuario.substring(0, 150);
	const username = req.body.lgn_usuario.substring(0, 150);
	// Encryption of the password
	const password = bcrypt.hashSync(req.body.pss_usuario, salt);
	const email = req.body.eml_usuario;
	req.connection.query('INSERT INTO tb_usuario (nme_usuario, lgn_usuario, pss_usuario, eml_usuario)'
		+ 'VALUES (?,?,?,?)', [name, username, password, email], (err, results) => {
			if (err) return next(err);
			res.json(results);
		});
});

app.patch('/usuarios/:id?', (req, res) => {
	const id = parseInt(req.params.id)
	const name = req.body.nme_usuario.substring(0, 150);
	const username = req.body.lgn_usuario.substring(0, 150);
	// Encryption of the password
	const password = bcrypt.hashSync(req.body.pss_usuario, salt);
	const email = req.body.eml_usuario;
	req.connection.query(`UPDATE tb_usuario SET nme_usuario = ?, lgn_usuario = ?, pss_usuario = ?,`
		+ ' eml_usuario = ? WHERE idt_cod_usuario = ?', [name, username, password, email, id], (err, results) => {
			if (err) return next(err);
			res.json(results);
		});
});

app.delete('/usuarios/:id?', (req, res) => {
	const id = parseInt(req.params.id);
	req.connection.query('DELETE FROM tb_usuario WHERE idt_cod_usuario = ?', [id], (err, results) => {
		if (err) return next(err);
		res.json(results);
	});
});

// Regente
app.get('/regentes', (req, res) => {
	req.connection.query('SELECT * FROM tb_regente', (err, results) => {
		if (err) return next(err);
		res.json(results);
	});
});

app.get('/usuarios/:id?/regente', (req, res) => {
	let filter = '';
	const id = parseInt(req.params.id);
	if (req.params.id) filter = ' WHERE cod_usuario = ?';
	req.connection.query('SELECT * FROM tb_regente' + filter, [id], (err, results) => {
		if (err) return next(err);
		res.json(results);
	});
});

app.post('/usuarios/:id?/regente', (req, res) => {
	const isAdmin = parseInt(req.body.bln_admin_regente);
	const id = parseInt(req.params.id);
	req.connection.query('INSERT INTO tb_regente (bln_admin_regente, cod_usuario)'
		+ 'VALUES (?, ?)', [isAdmin, id], (err, results) => {
			if (err) return next(err);
			res.json(results);
		});
});

app.patch('/usuarios/:id?/regente', (req, res) => {
	const isAdmin = parseInt(req.body.bln_admin_regente);
	const id = parseInt(req.params.id);
	req.connection.query('UPDATE tb_regente SET bln_admin_regente = ?'
		+ ' WHERE cod_usuario = ?', [isAdmin, id], (err, results) => {
			if (err) return next(err);
			res.json(results);
		});
});

app.delete('/usuarios/:id?/regente', (req, res) => {
	const id = parseInt(req.params.id);
	req.connection.query('DELETE FROM tb_regente WHERE cod_usuario = ?', [id], (err, results) => {
		if (err) return next(err);
		res.json(results);
	});
});

// Coralista
app.get('/coralistas', (req, res) => {
	req.connection.query('SELECT * FROM tb_coralista', (err, results) => {
		if (err) return next(err);
		res.json(results);
	});
});
app.get('/usuarios/:id?/coralista', (req, res) => {
	let filter = '';
	const id = parseInt(req.params.id);
	if (req.params.id) filter = ' WHERE cod_usuario = ?';
	req.connection.query('SELECT * FROM tb_coralista' + filter, [id], (err, results) => {
		if (err) return next(err);
		res.json(results);
	});
});

app.post('/usuarios/:id?/coralista', (req, res) => {
	const naipe = parseInt(req.body.cod_naipe);
	const id = parseInt(req.params.id);
	req.connection.query('INSERT INTO tb_coralista (cod_usuario, cod_naipe)'
		+ 'VALUES (?,?)', [id, naipe], (err, results) => {
			if (err) return next(err);
			res.json(results);
		});
});

app.patch('/usuarios/:id?/coralista', (req, res) => {
	const naipe = parseInt(req.body.cod_naipe);
	const id = parseInt(req.params.id);
	req.connection.query('UPDATE tb_coralista SET cod_usuario = ?'
		+ ' WHERE cod_naipe = ?', [id, naipe], (err, results) => {
			if (err) return next(err);
			res.json(results);
		});
});

app.delete('/usuarios/:id?/coralista', (req, res) => {
	const id = parseInt(req.params.id);
	req.connection.query('DELETE FROM tb_coralista WHERE cod_usuario = ?', [id], (err, results) => {
		if (err) return next(err);
		res.json(results);
	});
});

// Naipe
app.get('/naipes/:id?', (req, res) => {
	let filter = '';
	const id = parseInt(req.params.id);
	if (req.params.id) filter = ' WHERE idt_cod_naipe = ?';
	req.connection.query('SELECT * FROM td_naipe' + filter, [id], (err, results) => {
		if (err) return next(err);
		res.json(results);
	});
});

app.post('/naipes', (req, res) => {
	const naipe = parseInt(req.body.desc_naipe);
	req.connection.query('INSERT INTO td_naipe (desc_naipe)'
		+ 'VALUES (?)', [naipe], (err, results) => {
			if (err) return next(err);
			res.json(results);
		});
});

app.patch('/naipes/:id?', (req, res) => {
	const naipe = parseInt(req.body.desc_naipe);
	const id = parseInt(req.params.id);
	req.connection.query('UPDATE td_naipe SET desc_naipe = ?'
		+ ' WHERE idt_cod_naipe = ?', [naipe, id], (err, results) => {
			if (err) return next(err);
			res.json(results);
		});
});

app.delete('/naipes/:id?', (req, res) => {
	const id = parseInt(req.params.id);
	req.connection.query('DELETE FROM td_naipe WHERE idt_cod_naipe = ?', [id], (err, results) => {
		if (err) return next(err);
		res.json(results);
	});
});

// Post
app.get('/usuarios/:id?/posts', (req, res) => {
	let filter = '';
	const id = parseInt(req.params.id);
	if (req.params.id) filter = ' WHERE cod_usuario = ?';
	req.connection.query('SELECT * FROM tb_post' + filter, [id], (err, results) => {
		if (err) return next(err);
		res.json(results);
	});
});

app.post('/usuarios/:id?/posts', (req, res) => {
	const isAdmin = parseInt(req.body.bln_admin_regente);
	const id = parseInt(req.params.id);
	req.connection.query('INSERT INTO tb_post (dta_publicacao_post, nta_post, cod_usuario, ttl_post, dsc_post, cmn_arquivo) '
		+ 'VALUES (?,?,?,?,?,?)', [isAdmin, id], (err, results) => {
			if (err) return next(err);
			res.json(results);
		});
});

app.patch('/usuarios/:id?/posts/:idPost?', (req, res) => {
	const dtaPublicacao = req.body.dta_publicacao_post;
	const ntaPost = parseInt(req.params.nta_post);
	const tituloPost = req.body.ttl_post;
	const descricaoPost = req.body.dsc_post;
	const caminhoArquivo = req.body.cmn_arquivo;
	const idUsuario = parseInt(req.params.id);
	const idPost = parseInt(req.params.idPost);

	req.connection.query('UPDATE tb_post SET dta_publicacao_post = ?, nta_post = ?, ttl_post = ?, dsc_post = ?,'
		+ ' cmn_arquivo = ? WHERE idt_cod_post = ? AND cod_usuario = ?', [dtaPublicacao, ntaPost, tituloPost, descricaoPost,
			caminhoArquivo, idPost, idUsuario], (err, results) => {
				if (err) return next(err);
				res.json(results);
			});
});

app.delete('/usuarios/:id?/posts/:idPost?', (req, res) => {
	const idPost = parseInt(req.params.idPost);
	req.connection.query('DELETE FROM tb_post WHERE idt_cod_post = ?', [idPost], (err, results) => {
		if (err) return next(err);
		res.json(results);
	});
});

// Ensaio
app.get('/ensaios/:id?', (req, res) => {
	let filter = '';
	const id = parseInt(req.params.id);
	if (req.params.id) filter = ' WHERE idt_cod_ensaio = ?';
	req.connection.query('SELECT * FROM tb_ensaio' + filter, [id], (err, results) => {
		if (err) return next(err);
		res.json(results);
	});
});

app.post('/ensaios', (req, res) => {
	const ensaio = parseInt(req.body.desc_ensaio);
	const dtaEnsaio = req.body.dta_ensaio;
	const horaEnsaio = req.body.hra_ensaio;
	const tipoEnsaio = parse(req.body.cod_tipo_ensaio);
	req.connection.query('INSERT INTO tb_ensaio (dsc_ensaio, dta_ensaio, hra_ensaio, cod_tipo_ensaio)'
		+ 'VALUES (?, ?, ?, ?)', [ensaio, dtaEnsaio, horaEnsaio, tipoEnsaio], (err, results) => {
			if (err) return next(err);
			res.json(results);
		});
});

app.patch('/ensaios/:id?', (req, res) => {
	const ensaio = parseInt(req.body.desc_ensaio);
	const dtaEnsaio = req.body.dta_ensaio;
	const horaEnsaio = req.body.hra_ensaio;
	const tipoEnsaio = parse(req.body.cod_tipo_ensaio);
	const id = parseInt(req.params.id);
	req.connection.query('UPDATE tb_ensaio SET dsc_ensaio = ?, dta_ensaio = ?, hra_ensaio = ?, cod_tipo_ensaio = ?'
		+ ' WHERE idt_cod_ensaio = ?', [ensaio, dtaEnsaio, horaEnsaio, tipoEnsaio, id], (err, results) => {
			if (err) return next(err);
			res.json(results);
		});
});

app.delete('/ensaios/:id?', (req, res) => {
	const id = parseInt(req.params.id);
	req.connection.query('DELETE FROM tb_ensaio WHERE idt_cod_ensaio = ?', [id], (err, results) => {
		if (err) return next(err);
		res.json(results);
	});
});

// Revisão
app.get('/usuarios/:id?/posts/:idPost?/revisao', (req, res) => {
	let filter = '';
	const idPost = parseInt(req.params.idPost);
	if (req.params.id) filter = ' WHERE cod_post = ?';
	req.connection.query('SELECT * FROM tb_revisao' + filter, [idPost], (err, results) => {
		if (err) return next(err);
		res.json(results);
	});
});

app.post('/usuarios/:id?/posts/:idPost?/revisao', (req, res) => {
	const descRevisao = req.body.desc_revisao;
	const aprovarPost = parseInt(req.body.bln_aprovar_revisao);
	const dtaRevisao = req.body.dta_revisao;
	const idPost = parseInt(req.params.idPost);
	const idRegente = parseInt(req.body.cod_regente);

	req.connection.query('INSERT INTO tb_revisao (desc_revisao, bln_aprovar_revisao, dta_revisao, cod_post, cod_regente) '
		+ 'VALUES (?,?,?,?,?,?)', [descRevisao, aprovarPost, dtaRevisao, idPost, idRegente], (err, results) => {
			if (err) return next(err);
			res.json(results);
		});
});

app.patch('/usuarios/:id?/posts/:idPost?/revisao', (req, res) => {
	const descRevisao = req.body.desc_revisao;
	const aprovarPost = parseInt(req.body.bln_aprovar_revisao);
	const dtaRevisao = req.body.dta_revisao;
	const idPost = parseInt(req.params.idPost);
	const idRegente = parseInt(req.body.cod_regente);

	req.connection.query('UPDATE tb_revisao SET desc_revisao = ?, bln_aprovar_revisao = ?, dta_revisao = ?,'
		+ '  cod_regente = ? WHERE cod_post = ?', 
		[descRevisao, aprovarPost, dtaRevisao, idRegente, idPost], (err, results) => {
				if (err) return next(err);
				res.json(results);
			});
});

app.delete('/usuarios/:id?/posts/:idPost?', (req, res) => {
	const idPost = parseInt(req.params.idPost);
	req.connection.query('DELETE FROM tb_revisao WHERE cod_post = ?', [idPost], (err, results) => {
		if (err) return next(err);
		res.json(results);
	});
});

// Chamada
app.get('/ensaios/:id?/chamada', (req, res) => {
	let filter = '';
	const id = parseInt(req.params.id);
	if (req.params.id) filter = ' WHERE cod_ensaio = ?';
	req.connection.query('SELECT * FROM tb_chamada' + filter, [id], (err, results) => {
		if (err) return next(err);
		res.json(results);
	});
});

app.post('/ensaios/:id/chamada', (req, res) => {
	const presente = parseInt(req.body.bln_presente);
	const idEnsaio = parseInt(req.params.id);
	const idCoralista = parseInt(req.body.cod_coralista);
	req.connection.query('INSERT INTO tb_chamada (bln_presente, cod_ensaio, cod_coralista) '
		+ 'VALUES (?, ?, ?, ?)', [presente, idEnsaio, idCoralista], (err, results) => {
			if (err) return next(err);
			res.json(results);
		});
});

app.patch('/ensaios/:id?/chamada', (req, res) => {
	const presente = parseInt(req.body.bln_presente);
	const idEnsaio = parseInt(req.params.id);
	const idCoralista = parseInt(req.body.cod_coralista);
	req.connection.query('UPDATE tb_chamada SET bln_presente = ?, cod_ensaio = ?, cod_coralista = ?'
		+ ' WHERE idt_cod_chamada = ?', [presente, idEnsaio, idCoralista], (err, results) => {
			if (err) return next(err);
			res.json(results);
		});
});

app.delete('/ensaios/:id?/chamada', (req, res) => {
	const id = parseInt(req.params.id);
	req.connection.query('DELETE FROM tb_chamada WHERE idt_cod_chamada = ?', [id], (err, results) => {
		if (err) return next(err);
		res.json(results);
	});
});

app.listen(3000);