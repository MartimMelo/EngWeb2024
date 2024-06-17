var express = require('express');
var router = express.Router();
var Compositor = require('../controllers/compositores');

/* GET writers listing. */
router.get('/', (req, res, next) => {
  Compositor.list()
    .then( data => {
      res.jsonp(data);
    })
    .catch(err => {
      res.status(500).jsonp(err);
    });
});

/* Get writer */
router.get('/:id', (req, res, next) => {
  Compositor.get(req.params.id)
    .then( data => {
      res.jsonp(data); 
    })
    .catch(err => {
      res.status(504).jsonp(err);
    });
});

/* POST writer listing. */
router.post('/', (req, res, next) => {
  Compositor.insert(req.body)
    .then(data => {
      res.jsonp(data);
    })
    .catch(err => {
      res.status(501).jsonp(err);
    });
});

/* PUT writer listing. */
router.put('/:id', (req, res, next) => {
  Compositor.update(req.params.id, req.body)
    .then(data => {
      res.jsonp(data);
    })
    .catch(err => {
      res.status(502).jsonp(err);
    });
});

/* DELETE writer listing. */
router.delete('/:id', (req, res, next) => {
  Compositor.delete(req.params.id)
    .then(data => {
      res.jsonp(data);
    })
    .catch(err => {
      res.status(503).jsonp(err);
    });
});


module.exports = router;
