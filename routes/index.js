const express = require('express');
const router = express.Router();

const booksController = require('../controllers/books_controller');
/* GET home page. */
router.get('/', booksController.index);

router.get('/sign_up', (req, res, next) => {
  res.render('signup', {
    title: 'Sign up',
  });
});

router.get('/sign_in', (req, res, next) => {
  res.render('signin', {
    title: 'Sign in',
  });
});

module.exports = router;
