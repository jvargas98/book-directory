const slackController = require('../../../controllers/slack_controller');

const commandAddBook = {
  type: '/addbook',
  send: (req, res, next) => {
    res.send('');
    slackController.command(req.body);
  },
};

module.exports = commandAddBook;
