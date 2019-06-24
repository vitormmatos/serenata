var bcrypt = require('bcrypt'); 

exports.signin = function(request, response) {
    var username = request.body.username;
    var password = request.body.password;
 
    // SQL Select searching for register that matchs with the User and Password of the request. 
    var sql = "SELECT u.nme_usuario, u.lgn_usuario, u.pss_usuario, u.eml_usuario, r.idt_cod_regente, r.bln_admin_regente " 
    + `FROM tb_usuario u LEFT JOIN tb_regente r ON u.idt_cod_usuario = r.cod_usuario WHERE lgn_usuario = "${username}"`;
    // Checks if user and password have been filled
    if (username && password) {
        request.connection.query(sql, function(error, results, fields) {
            // Checks if user was found and the filled password matchs with the stored password
			if (results.length > 0 && bcrypt.compareSync(password, results[0].pss_usuario)) {
				request.session.loggedin = true;
                request.session.username = username;
            // Checks if user is a Regent   
            if(results[0].idt_cod_regente != null){
                request.session.isRegente = true;
                // Checks if user is admin
                if(results[0].bln_admin_regente) {
                    request.session.isAdmin = true;
                }
            }
            // TODO: Change redirect route after authentication     
            response.redirect('/home');
			} else {
                // TODO: Responses in a alert or other component
				response.send('Usuário e/ou senha incorreta(s)!');
			}			
			response.end();
        });
	} else {
		response.send('Usuário e senha obrigatórios.');
		response.end();
    }
};
