# Team Time Zone backend

This is a simple [Express.js][express] app which provides the authentication API for [Team Time Zone][ttz]. The only endpoint is `/api/tokens`, which implements the second stage of the [Slack OAuth2 Web Authentication Flow][slack-oauth].

[express]: http://expressjs.com
[ttz]: https://github.com/alisdair/team-time-zone
[slack-oauth]: https://api.slack.com/docs/oauth

## Installation

Clone the repository, then run `npm install`.

## Deployment

You'll need to configure your [Slack application keys][slack-app] to use this yourself. Store these on your server in a `.env` file, using the format given in `.env.example`. You can also use this file to change the port that Express listens on.

[slack-app]: https://api.slack.com/applications

[The Ember app][ttz] expects the token endpoint at `/api/tokens` on the same domain it is served from, so you will probably need to set up a proxy to do that. How you do so depends on your web server.

## To-do List

* [ ] Add integration tests with [Nock][nock]
* [ ] More documentation on deployment
* [ ] Better error handling

[nock]: https://github.com/pgte/nock
