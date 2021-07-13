const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

function initialize(passport, user) {
  const authenticateUser = async (req, email, password, done) => {
    try {
      const userFound = await user.findOne({ where: { email } });
      if (userFound == null) {
        return done(
          null,
          false,
          req.flash('message', 'Email or password incorrect'),
        );
      }
      const correctPassword = await bcrypt.compare(
        password,
        userFound.password,
      );
      if (correctPassword) {
        return done(null, userFound);
      }
      return done(
        null,
        false,
        req.flash('message', 'Email or password incorrect'),
      );
    } catch (e) {
      return done(e);
    }
  };

  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
      },
      authenticateUser,
    ),
  );
  passport.serializeUser((userFound, done) => done(null, userFound));
  passport.deserializeUser((userFound, done) => done(null, userFound));
}

module.exports = initialize;
