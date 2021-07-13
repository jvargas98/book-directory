const challenge = {
  type: 'url_verification',
  send: (req, res, next) => {
    res.send(req.body.challenge);
  },
};

module.exports = challenge;
