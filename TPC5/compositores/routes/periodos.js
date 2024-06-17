var express = require('express');
var axios = require('axios');
var router = express.Router();

/* GET period list page. */
router.get('/', (req, res, next) => {
  axios.get('http://localhost:3000/periodos?_sort=nome')
  .then( resp => {
      periodos = resp.data;
      res.render('listaPeriodos', { title: 'Períodos', periodos: periodos });
  })
  .catch( erro => {
      res.render('error', { title: 'Erro', error: erro, message: "Não foi possível obter a lista de períodos" });
  });
});

/* GET new period form page. */
router.get('/registo', (req, res, next) => {
  res.render('registoPeriodo', { title: 'Adicionar período' });
});

/* GET period page. */
router.get('/edit/:idPeriodo', (req, res, next) => {
  axios.get('http://localhost:3000/periodos/' + req.params.idPeriodo)
  .then( resp => {
      periodo = resp.data;
      res.render('editarPeriodo', { title: `Editar período`, periodo: periodo});
  })
  .catch( erro => {
      res.render('error', { title: 'Erro', error: erro, message: "Não foi possível obter as informações do período " + req.params.idPeriodo});
  });
});

/* GET delete period page. */
router.get('/delete/:idPeriodo', (req, res, next) => {
  axios.delete('http://localhost:3000/periodos/' + req.params.idPeriodo)
  .then( resp => {
    res.redirect('/periodos');
  })
  .catch( erro => {
      res.render('error', { title: 'Erro', error: erro, message: "Não foi possível obter as informações do período " + req.params.idPeriodo});
  });
});

/* POST new period form page */
router.post('/registo', (req, res ,next) => {
  result = req.body;
  axios.post("http://localhost:3000/periodos/", result)
  .then( resp => {
    res.status(201).redirect('/periodos');
  })
  .catch(err => {
    res.render('error', { title: 'Erro', error: err, message: "Não foi possível adicionar as informações do periodo" })
  });
});

/* POST edit writer form page */
router.post('/edit/:idPeriodo', (req, res ,next) => {
  result = req.body;
  axios.put("http://localhost:3000/periodos/" + req.params.idPeriodo, result)
  .then( resp => {
    res.status(201).redirect('/periodos/' + result.nome);
  })
  .catch(err => {
    res.render('error', { title: 'Erro', error: err, message: "Não foi possível atualizar as informações do periodo" })
  });
});

/* GET period page. */
router.get('/:nome', (req, res, next) => {
  axios.get('http://localhost:3000/compositores?periodo=' + req.params.nome)
  .then( resp => {
      compositores = resp.data;
      res.render('paginaPeriodo', { title: `${req.params.nome}`, compositores: compositores, periodo: req.params.nome});
  })
  .catch( erro => {
      res.render('error', { title: 'Erro', error: erro, message: "Não foi possível obter as informações do período " + req.params.nome});
  });
});


module.exports = router;