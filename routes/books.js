const express = require('express');

const router = express.Router();

const booksController = require('../controllers/books_controller');

router.get('/new', booksController.new);
router.get('/view', booksController.show);
router.get('/edit', booksController.edit);
router.post('/destroy', booksController.destroy);
router.get('/pdf', booksController.generatePdf);
router.post('/', booksController.create);

module.exports = router;
