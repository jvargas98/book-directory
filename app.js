const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const session = require('express-session');
const flash = require('express-flash');
const db = require('./models');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const booksRouter = require('./routes/books');
const slackRouter = require('./routes/slack');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  '/assets/vendor/bootstrap',
  express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist')),
);
app.use(
  '/assets/vendor/jquery',
  express.static(path.join(__dirname, 'node_modules', 'jquery', 'dist')),
);
app.use(
  '/assets/vendor/popper.js',
  express.static(
    path.join(__dirname, 'node_modules', 'popper.js', 'dist', 'umd'),
  ),
);

// load passport strategies
const initializePassport = require('./config/passport');

initializePassport(passport, db.users);

app.use(flash());

// For passport
app.use(
  session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }),
); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/books', booksRouter);
app.use('/slack', slackRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
