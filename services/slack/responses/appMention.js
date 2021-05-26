const slackController = require('../../../controllers/slack_controller');

const appMention = {
  type: 'app_mention',
  send: (req, res, next) => {
    res.sendStatus(200);
    slackController.appMention(req.body);
  },
};

module.exports = appMention;
