exports.login = function(request, response) {
    response.sendFile(path.join(__dirname + '/views/login.html'));
}

