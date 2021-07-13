const { WebClient } = require('@slack/web-api');
require('dotenv').config();

const slackToken = process.env.SLACK_TOKEN;
const slackClient = new WebClient(slackToken);

module.exports = slackClient;
