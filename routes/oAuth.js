/* LOAD ALL DEPENDENCIES
----------------------------------------- */
const express = require('express');
const router = express.Router();
const oauth = require('oauth');

/* TWITTER CONFIGURATION
----------------------------------------- */
const consumerKey = process.env.CONSUMERKEY;
const consumerSecret = process.env.CONSUMERSECRET;
const accessToken = process.env.ACCESSTOKEN;
const tokenSecret = process.env.ACCESSTOKENSECRET;

const consumer = new oauth.OAuth(
  'https://twitter.com/oauth/request_token',
  'https://twitter.com/oauth/access_token',
  consumerKey,
  consumerSecret,
  '1.0A',
  'http://localhost:3000/twitter/callback',
  'HMAC-SHA1'
);

/* ROUTES
----------------------------------------- */
router.get('/', function(req, res) {
  const userCollection = db.collection('users');
  const config = {
    url: 'https://api.twitter.com/1.1/account/verify_credentials.json',
    token: req.session.oauthAccessToken,
    verify: req.query.oauth_verifier,
    secret: req.session.oauthAccessSecret
  }
  consumer.get(config.url, config.token, config.secret, function (error, data, response) {
    if(error) {
      res.redirect('/twitter/login');
    } else {
      const cleanData = JSON.parse(data);
      req.session.login = true;
      req.session.data = cleanData;
      userCollection.findOne({
          username: cleanData.screen_name
      }, function(err, user) {
        if(user) {
         req.session.user = user;
         res.redirect('/dashboard');
       } else {
         res.redirect('/account/setup')
       }
     });
    }
  });
});

router.get('/login', function(req, res) {
  consumer.getOAuthRequestToken(function(error, oauthToken, oauthTokenSecret, results) {
    if (error) {
      console.log(`Error: ${error}`);
    } else {
      req.session.ReqToken = oauthToken;
      req.session.ReqSecret = oauthTokenSecret;
      res.redirect(`https://twitter.com/oauth/authorize?oauth_token=${req.session.ReqToken}`);
    }
  });
});

router.get('/callback', function(req, res) {
  const config = {
    token: req.session.ReqToken,
    secret: req.session.ReqSecret,
    verify: req.query.oauth_verifier
  }
  consumer.getOAuthAccessToken(config.token, config.secret, config.verify, function(error, token, secret, results) {
    if (error) {
      console.log(error);
    } else {
      req.session.oauthAccessToken = token;
      req.session.oauthAccessSecret = secret;
      req.session.login = true;
      res.redirect('/twitter');
    }
  });
});

/* EXPORT ROUTER
----------------------------------------- */
module.exports = router;
