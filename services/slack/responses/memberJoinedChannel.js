const slackController = require('../../../controllers/slack_controller');

const memberJoinedChannel = {
  type: 'member_joined_channel',
  send: (req, res, next) => {
    res.sendStatus(200);
    slackController.memberJoinedChannel(req.body);
  },
};

module.exports = memberJoinedChannel;
