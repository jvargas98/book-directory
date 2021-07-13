/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable operator-linebreak */
const recordResponses = require('./responses');

const handlerRequest = (request) => {
  const response = recordResponses.find(
    (res) =>
      (request.event !== undefined && res.type === request.event.type) ||
      (request.command !== undefined && res.type === request.command) ||
      (request.type !== undefined && res.type === request.type),
  );

  if (!response) {
    return null;
  }

  return response;
};

module.exports = handlerRequest;
