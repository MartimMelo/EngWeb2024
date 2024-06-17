var express = require('express');
var router = express.Router();
var Periodo = require('../controllers/periodos');

/* GET periods listing. */
router.get('/', (req, res, next) => {
  Periodo.list()
    .then(data => {
      res.jsonp(data);
    })
    .catch(err => {
      res.status(505).jsonp(err);
    });
});

/* PUT period */
router.get('/:id', (req, res, next) => {
  Periodo.get(req.params.id)
    .then(data => {
      res.jsonp(data);
    })
    .catch(err => {
      res.status(506).jsonp(err);
    });
});

/* POST period */
router.post('/', (req, res, next) => {
  Periodo.insert(req.body)
    .then(data => {
      res.jsonp(data);
    })
    .catch(err => {
      res.status(507).jsonp(err);
    });
});

/* PUT period */
router.put('/:id', (req, res, next) => { 
  Periodo.update(req.params.id, req.body)
    .then(data => {
      res.jsonp(data);
    })
    .catch(err => {
      res.status(508).jsonp(err);
    });
});

/* DELETE period */
router.delete('/:id', (req, res, next) => { 
  Periodo.delete(req.params.id)
    .then(data => {
      res.jsonp(data);
    })
    .catch(err => {
      res.status(509).jsonp(err);
    });
});

module.exports = router;
