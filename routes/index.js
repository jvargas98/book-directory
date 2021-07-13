const express = require('express');
const router = express.Router();

const booksController = require('../controllers/books_controller');
/* GET home page. */
router.get('/', booksController.index);

module.exports = router;
