let http = require('http');
let axios = require('axios');
const { parse } = require('querystring');

var templates = require('./templates.js');
var static = require('./static.js');

// Aux functions
function collectRequestBodyData(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}

http.createServer( (req, res) => {
    var d = new Date().toISOString().substring(0, 16);
    console.log(req.method + " " + req.url + " " + d);

    // Handling request
    if(static.staticResource(req)){
        static.serveStaticResource(req, res);
    } else{
        switch(req.method){
            case 'GET':
                // GET compositores
                if (req.url == '/' || req.url == '/compositores'){
                    axios.get('http://localhost:3000/compositores?_sort=nome')
                    .then(resp => {
                        compositores = resp.data;
                        res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
                        res.write(templates.writersListPage(compositores));
                        res.end();
                    })
                    .catch(erro => {
                        res.writeHead(501, {'Content-Type' : 'text/html; charset=utf-8'});
                        res.write("<p>Não foi possível obter a lista de compositores: " + erro + "</p>");
                        res.end();
                    });
                }
                // GET compositores/idCompositor
                else if (req.url.match(/\/compositores\/C[0-9]+/)){
                    axios.get('http://localhost:3000' + req.url)
                    .then( resp => {
                        compositor = resp.data;
                        res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
                        res.write(templates.writerPage(compositor));
                        res.end();
                    })
                    .catch( erro => {
                        res.writeHead(502, {'Content-Type' : 'text/html; charset=utf-8'});
                        res.write("<p>Não foi possível obter o perfil do compositor: " + erro + "</p>");
                        res.end();
                    });
                }
                else if (req.url == '/compositores/registo') {
                    res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
                    res.write(templates.addWriterFormPage());
                    res.end();
                }
                else if (req.url.match(/\/compositores\/edit\/C[0-9]+/)){
                    let compositor = req.url.substring(19);
                    axios.get('http://localhost:3000/compositores/' + compositor)
                    .then(resp => {
                        comp = resp.data;
                        res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
                        res.write(templates.editWriterFormPage(comp));
                        res.end();
                    })
                    .catch(err => {
                        res.writeHead(507, {'Content-Type' : 'text/html; charset=utf-8'});
                        res.write("<p>Não foi possível obter o perfil do compositor: " + erro + "</p>");
                        res.end();
                    });
                }
                else if (req.url.match(/\/compositores\/delete\/C[0-9]+$/i)) {
                    idCompositor = req.url.split('/')[3]
                    axios.delete("http://localhost:3000/compositores/" + idCompositor)
                    .then(resp => {
                        res.writeHead(201, {'Content-Type' : 'text/html; charset=utf-8'});
                        res.write("<p>Registo apagado</p>");
                        res.end();
                    })
                    .catch(erro => {
                        res.writeHead(514, {'Content-Type' : 'text/html; charset=utf-8'});
                        res.write("<p>Não foi possível eliminar o aluno " + idAluno + "::" + erro + "</p>");
                        res.end();
                    });
                }
                // GET periodos
                else if (req.url == '/periodos'){
                    axios.get('http://localhost:3000/periodos?_sort=nome')
                    .then( resp => {
                        periodos = resp.data;
                        res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
                        res.write(templates.periodsListPage(periodos));
                        res.end();
                    })
                    .catch( erro => {
                        res.writeHead(503, {'Content-Type' : 'text/html; charset=utf-8'});
                        res.write("<p>Não foi possível obter os períodos: " + erro + "</p>");
                        res.end();
                    });
                } 
                else if (req.url == '/periodos/registo') {
                    res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
                    res.write(templates.addPeriodFormPage());
                    res.end();
                }
                // GET periodos/idPeriodo
                else if (req.url.match(/\/periodos\/[A-Za-z]+$/)){
                    axios.get('http://localhost:3000/compositores?periodo=' + req.url.substring(10))
                    .then( resp => {
                        writers = resp.data;
                        res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
                        res.write(templates.periodPage(req.url.substring(10), writers));
                        res.end();
                    })
                    .catch( erro => {
                        res.writeHead(504, {'Content-Type' : 'text/html; charset=utf-8'});
                        res.write("<p>Não foi possível obter a página do período: " + erro + "</p>");
                        res.end();
                    });
                }
                else if (req.url.match(/\/periodos\/edit\/P[0-9]+/)){
                    let periodo = req.url.substring(15);
                    axios.get('http://localhost:3000/periodos/' + periodo)
                    .then(resp => {
                        per = resp.data;
                        res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
                        res.write(templates.editPeriodFormPage(per));
                        res.end();
                    })
                    .catch(err => {
                        res.writeHead(513, {'Content-Type' : 'text/html; charset=utf-8'});
                        res.write("<p>Não foi possível obter o perfil do compositor: " + erro + "</p>");
                        res.end();
                    });
                }
                else if (req.url.match(/\/periodos\/delete\/P[0-9]+$/i)) {
                    idCompositor = req.url.split('/')[3]
                    axios.delete("http://localhost:3000/compositores/" + idCompositor)
                    .then(resp => {
                        res.writeHead(201, {'Content-Type' : 'text/html; charset=utf-8'});
                        res.write("<p>Registo apagado</p>");
                        res.end();
                    })
                    .catch(erro => {
                        res.writeHead(509, {'Content-Type' : 'text/html; charset=utf-8'});
                        res.write("<p>Não foi possível eliminar o aluno " + idAluno + "::" + erro + "</p>");
                        res.end();
                    });
                }
                else {
                    res.writeHead(505, {'Content-Type' : 'text/html; charset=utf-8'});
                    res.write("<p>Método não suportado:" + req.method + " </p>");
                    res.end();
                }
                break;
            case 'POST':
                // POST /compositores/registo
                if (req.url == '/compositores/registo'){
                    collectRequestBodyData(req, result => {
                        if (result) {
                            axios.post("http://localhost:3000/compositores", result)
                            .then( resp => {
                                res.writeHead(201, {'Content-Type' : 'text/html; charset=utf-8'});
                                res.write("<p>Registo criado: " + JSON.stringify(resp.data) + "</p>");
                                res.end();
                            })
                            .catch(err => {
                                res.writeHead(515, {'Content-Type' : 'text/html; charset=utf-8'});
                                res.write(templates.errorPage("Não foi possível criar novo registo....",d));
                                res.end();
                            });
                        } else {
                            res.writeHead(506, {'Content-Type' : 'text/html; charset=utf-8'});
                            res.write("<p>Não foi possível obter os dados do body</p>");
                            res.end();
                        }
                    });
                }
                // POST /compositores/edit/idCompositor
                else if (req.url.match(/\/compositores\/edit\/C[0-9]+$/i)) {
                    collectRequestBodyData(req, result => {
                        if (result) {
                            console.log(result);
                            axios.put("http://localhost:3000/compositores/" + result.id, result)
                            .then( resp => {
                                res.writeHead(303, {'Content-Type' : 'text/html; charset=utf-8'});
                                res.write("<p>Registo alterado: " + JSON.stringify(resp.data) + "</p>");
                                res.end();
                            })
                            .catch(err => {
                                res.writeHead(516, {'Content-Type' : 'text/html; charset=utf-8'});
                                res.write(templates.errorPage("Não foi possível editar....",d));
                                res.end();
                            });
                        } else {
                            res.writeHead(511, {'Content-Type' : 'text/html; charset=utf-8'});
                            res.write("<p>Não foi possível obter os dados do body</p>");
                            res.end();
                        }
                    });
                }
                // POST /periodos/registo
                else if (req.url == '/periodos/registo'){
                    collectRequestBodyData(req, result => {
                        if (result) {
                            axios.post("http://localhost:3000/periodos", result)
                            .then( resp => {
                                res.writeHead(201, {'Content-Type' : 'text/html; charset=utf-8'});
                                res.write("<p>Registo criado: " + JSON.stringify(resp.data) + "</p>");
                                res.end();
                            })
                            .catch(err => {
                                res.writeHead(508, {'Content-Type' : 'text/html; charset=utf-8'});
                                res.write(templates.errorPage("Não foi possível criar novo registo....",d));
                                res.end();
                            });
                        } else {
                            res.writeHead(518, {'Content-Type' : 'text/html; charset=utf-8'});
                            res.write("<p>Não foi possível obter os dados do body</p>");
                            res.end();
                        }
                    });
                }
                // POST /periodos/edit/periodos
                else if (req.url.match(/\/periodos\/edit\/P[0-9]+$/i)) {
                    collectRequestBodyData(req, result => {
                        if (result) {
                            axios.put("http://localhost:3000/periodos/" + result.id, result)
                            .then( resp => {
                                res.writeHead(303, {'Content-Type' : 'text/html; charset=utf-8'});
                                res.write("<p>Registo alterado: " + JSON.stringify(resp.data) + "</p>");
                                res.end();
                            })
                            .catch(err => {
                                res.writeHead(510, {'Content-Type' : 'text/html; charset=utf-8'});
                                res.write(templates.errorPage("Não foi possível editar....",d));
                                res.end();
                            });
                        } else {
                            res.writeHead(517, {'Content-Type' : 'text/html; charset=utf-8'});
                            res.write("<p>Não foi possível obter os dados do body</p>");
                            res.end();
                        }
                    });
                }
                // POST ? -> Lancar um erro
                else {
                    res.writeHead(512, {'Content-Type' : 'text/html; charset=utf-8'});
                    res.write("<p>POST request não suportado: " + req.url + " </p>");
                    res.end();
                }
                break
            default:
                res.writeHead(500, {'Content-Type' : 'text/html; charset=utf-8'});
                res.write("<p>Pedido GET não suportado:" + req.url + " </p>");
                res.end();
                break;
        }
    }
}).listen(7777);

console.log("Servidor à espera de conexões na porta 7777");