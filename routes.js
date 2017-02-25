var config = {
  client_id: process.env.SLACK_CLIENT_ID,
  client_secret: process.env.SLACK_CLIENT_SECRET,
};

var express = require('express');
var router = express.Router();
var request = require('request');

var AUTH_URL = 'https://slack.com/api/oauth.access';
router.get('/check', function(req, res, next) {
  res.sendStatus(204);
});
router.post('/tokens', function(req, res, next) {
  var code = req.body.authorizationCode;
  if (!code) {
    res.status(422);
    res.json({ message: 'Missing parameter: authorizationCode' });
    return;
  }

  var redirect_uri = req.body.redirectUri;
  if (!redirect_uri) {
    res.status(422);
    res.json({ message: 'Missing parameter: redirectUri' });
    return;
  }

  var params = {
    client_id: config.client_id,
    client_secret: config.client_secret,
    code: code,
    redirect_uri: redirect_uri
  };

  request.post({ url: AUTH_URL, form: params }, function(error, response, body) {
    if (error || response.statusCode !== 200) {
      res.status(500);
      res.json({ message: 'Unknown error occurred' });
      return;
    }

    data = JSON.parse(body);

    if (!data.ok) {
      res.status(400);
      res.json({ message: body.error || 'Unknown error occurred' });
      return;
    }

    res.status(201);
    res.json({
      accessToken: data.access_token,
      scope: data.scope
    });
  });
});

module.exports = router;
