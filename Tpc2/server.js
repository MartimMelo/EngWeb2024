var http = require('http');
var fs = require('fs');
var url = require('url');

http.createServer(function(req, res) {
    var regex = /^\/c\d+$/;
    var q = url.parse(req.url, true);
    console.log(q.pathname);

    if (q.pathname === '/') {
        // Serve the index.html directly
        fs.readFile('city_index.html', function(err, data) {
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.write(data);
            res.end();
        });
    } else if (regex.test(q.pathname)) {
        // Serve other pages from the 'city_details/' directory
        fs.readFile('city_details/' + q.pathname.slice(1) + '.html', function(err, data) {
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.write(data);
            res.end();
        });
    } else {
        // Handle 404 for invalid paths
        res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
        res.write('Página não encontrada.');
        res.end();
    }
}).listen(7777);

console.log('Servidor iniciado na porta 7777. Pressione CTRL+C para terminar.');
