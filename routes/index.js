/* eslint-disable consistent-return */
const express = require('express');
const passport = require('passport');
const router = express.Router();

const usersController = require('../controllers/users_controller');
const booksController = require('../controllers/books_controller');

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/sign_in');
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }
  next();
}

/* GET home page. */
router.get('/', checkAuthenticated, booksController.index);

router.get('/sign_up', checkNotAuthenticated, (req, res, next) => {
  res.render('signup', {
    title: 'Sign up',
  });
});

router.post('/sign_up', checkNotAuthenticated, usersController.create);

router.get('/sign_in', checkNotAuthenticated, (req, res, next) => {
  res.render('signin', {
    title: 'Sign in',
    message: req.flash('message'),
  });
});

router.post(
  '/sign_in',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/sign_in',
    failureFlash: true,
  }),
);

router.get('/logout', (req, res) => {
  req.logOut();
  res.redirect('/sign_in');
});

module.exports = router;
