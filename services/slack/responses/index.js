const appMention = require('./appMention');
const commandAddBook = require('./commandAddBook');
const challenge = require('./challenge');
const message = require('./message');
const memberJoinedChannel = require('./memberJoinedChannel');
const viewSubmission = require('./viewSubmission');

const recordResponses = [
  appMention,
  commandAddBook,
  challenge,
  message,
  memberJoinedChannel,
  viewSubmission,
];

module.exports = recordResponses;
