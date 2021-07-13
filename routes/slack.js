const express = require('express');
const handlerRequest = require('../services/slack');

const router = express.Router();

// eslint-disable-next-line no-confusing-arrow
const getPayload = (body) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  body.payload !== undefined ? JSON.parse(body.payload) : body;

router.post('/', (req, res, next) => {
  const payload = getPayload(req.body);

  const response = handlerRequest(payload);

  if (response === null) {
    console.log('2. Response not found');
  }
  console.log(response);
  response.send(req, res, next);

  // console.log(payload);

  /* if (payload.challenge !== undefined) {
    res.send(payload.challenge);
  } else if (payload.event !== undefined) {
    if (payload.event.type === 'app_mention') {
      res.sendStatus(200);
      slackController.appMention(payload);
    } else if (payload.event.type === 'message') {
      res.sendStatus(200);
      let responseText;
      if (payload.event.text.includes("Who's there?")) {
        responseText = 'A bot user';
        slackController.message(payload, responseText);
      }
    } else if (payload.event.type === 'member_joined_channel') {
      res.sendStatus(200);
      slackController.memberJoinedChannel(payload);
    }
  } else if (payload.command !== undefined) {
    if (payload.command === '/addbook') {
      res.send('');
      slackController.command(payload);
    }
  } else if (payload.type !== undefined) {
    if (payload.type === 'view_submission') {
      res.send('');
      slackController.viewSubmission(payload);
    }
  } */
});

module.exports = router;
