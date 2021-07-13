const bcrypt = require('bcrypt');
const db = require('../models');

const User = db.users;

const controller = {};

controller.create = async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await User.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: hashedPassword,
    });
    res.redirect('/');
  } catch (err) {
    next(err);
  }
};

module.exports = controller;
