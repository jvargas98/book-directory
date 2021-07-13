const slackController = require('../../../controllers/slack_controller');

const message = {
  type: 'message',
  responsesText: {
    "Who's there?": 'A bot user',
  },
  send: (req, res, next) => {
    res.sendStatus(200);
    const responseText = message.responsesText[req.body.event.text];
    if (responseText !== undefined) {
      slackController.message(req.body, responseText);
    }
  },
};

module.exports = message;
