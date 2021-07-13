const slackController = require('../../../controllers/slack_controller');

const viewSubmission = {
  type: 'view_submission',
  send: (req, res, next) => {
    res.send('');
    slackController.viewSubmission(JSON.parse(req.body.payload));
  },
};

module.exports = viewSubmission;
