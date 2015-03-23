var express = require('express');
var service = require('../services/books');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.write('data');//service.getBooks();
    next();
});

router.get('/:id', function(req, res, next) {
    service.getBook();
});

router.post('/:id', function(req, res, next) {
    service.addBook();
});

router.put('/:id', function(req, res, next) {
    service.updateBook();
});

router.delete('/:id', function(req, res, next) {
    service.deleteBook();
});

router.get('/:id/customers', function(req, res, next) {
    service.getCustomersofBook();
});

module.exports = router;
