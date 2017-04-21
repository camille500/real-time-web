
  /* LOAD ALL DEPENDENCIES
  ----------------------------------------- */
  const express = require('express');
  const router = express.Router();
  const passwordHash = require('password-hash');

  /* ACCOUNT ROUTE
  ----------------------------------------- */
  router.get('/', checkForSession, function(req, res) {
    res.locals.data = req.session.data;
    res.render('dashboard/index')
  });

  router.get('/twitter', checkForSession, function(req, res) {
    res.render('dashboard/twitter')
  });

  router.get('/settings', checkForSession, function(req, res) {
    res.locals.data = req.session.data;
    res.render('dashboard/settings');
  });

  router.post('/settings', checkForSession, function(req, res) {
    const collection = db.collection('users');
    const username = req.body.username;
    const mail = req.body.mail;
    const hometown = req.body.hometown;
    collection.findOne({
      username: req.session.data.username
    }, function(err, user) {
      if (user) {
        collection.updateOne(user, {
          $set: {
            username: username,
            mail: mail,
            homeTown: hometown
          }
        }, (error, result) => {
          if (err)
            return console.log(err)
          req.session.data.username = username;
          req.session.data.mail = mail;
          req.session.data.homeTown = hometown;
          res.redirect('/dashboard')
        })
      } else {
        res.redirect('/dashboard');
      }
    });
  });

  function checkForSession(req, res, next) {
    if (req.session.login) {
      next();
    } else {
      res.redirect('/account');
    }
  }

module.exports = router;
