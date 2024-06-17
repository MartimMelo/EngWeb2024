var express = require('express');
var axios = require('axios');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
    axios.get('http://localhost:3000/compositores?_sort=nome')
    .then(resp => {
        compositores = resp.data;
        res.render('listaCompositores', { title: 'Compositores', compositores: compositores });
    })
    .catch(erro => {
        res.render('error', { title: 'Erro', error: erro, message: "Não foi possível obter a lista de compositores"});
    });
});
  
/* GET writer page. */
router.get('/:idCompositor', (req, res, next) => {
    axios.get('http://localhost:3000/compositores/' + req.params.idCompositor)
    .then(resp => {
        compositor = resp.data;
        res.render('paginaCompositor', { title: `${compositor.nome}`, writer: compositor });
    })
    .catch(erro => {
        res.render('error', { title: 'Erro', error: erro, message: "Não foi possível obter a página do compositor"});
    });
});
  
/* GET new writer form page. */
router.get('/registo', (req, res, next) => {
    res.render('registoCompositor', { title: 'Adicionar compositor' });
});
  
/* GET edit writer form page. */
router.get('/edit/:writerID', (req, res, next) => {
    axios.get('http://localhost:3000/compositores/' + req.params.writerID)
    .then(resp => {
        compositor = resp.data;
        res.render('editarCompositor', { title: `Editar compositor`, writer: compositor });
    })
    .catch(erro => {
        res.render('error', { title: 'Erro', error: erro, message: "Não foi possível obter as informações do compositor"});
    });
});
  
/* GET delete writer page. */
router.get('/delete/:idCompositor', (req, res, next) => {
    axios.delete('http://localhost:3000/compositores/' + req.params.idCompositor)
    .then( resp => {
      res.redirect('/compositores');
    })
    .catch( erro => {
      res.render('error', { title: 'Erro', error: erro, message: "Não foi possível obter as informações do compositor " + req.params.idCompositor});
    });
});

/* POST new writer form page */
router.post('/registo', (req, res ,next) => {
    result = req.body;
    axios.post("http://localhost:3000/compositores", result)
    .then( resp => {
      res.status(201).redirect('/compositores');
    })
    .catch(err => {
      res.render('error', { title: 'Erro', error: err, message: "Não foi possível adicionar as informações do periodo" })
    });
});
  
/* POST edit writer form page */
router.post('/edit/:compositor', (req, res ,next) => {
    result = req.body;
    axios.put("http://localhost:3000/compositores/" + req.params.compositor, result)
    .then( resp => {
      res.status(201).redirect('/compositores/' + req.params.compositor);
    })
    .catch(err => {
      res.render('error', { title: 'Erro', error: err, message: "Não foi possível atualizar as informações do compositor" })
    });
});

module.exports = router;