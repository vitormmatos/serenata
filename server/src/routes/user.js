exports.signin = function(request, response) {
	var username = request.body.username;
    var password = request.body.password;
 
    var sql = "SELECT u.lgn_usuario, r.idt_cod_regente, r.bln_admin_regente from tb_usuario u LEFT JOIN tb_regente r ON "
    + "u.idt_cod_usuario = r.cod_usuario WHERE lgn_usuario = '" + username + "' AND pss_usuario = '" + password + "'";
    // verifica se usuário e senha foram preenchidos
    if (username && password) {
		db.query(sql, function(error, results, fields) {
            // verifica se existe algum registro com usuario e senha iguais aos digitados
			if (results.length > 0) {
				request.session.loggedin = true;
                request.session.username = username;
            // verifica se usuário é regente   
            console.log(results[0]); 
            if(results[0].idt_cod_regente != null){
                request.session.isRegente = true;
                //verifica se regente é admin
                if(results[0].bln_admin_regente) {
                    request.session.isAdmin = true;
                }
            }                     
            response.redirect('/home');
			} else {
				response.send('Usuário e/ou senha incorreta(s)!');
			}			
			response.end();
		});
	} else {
		response.send('Usuário e senha obrigatórios.');
		response.end();
    }
};
