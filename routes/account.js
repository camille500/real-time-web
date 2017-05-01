/* LOAD ALL DEPENDENCIES
----------------------------------------- */
const express = require('express');
const router = express.Router();
const passwordHash = require('password-hash');

/* INDEX ROUTE
----------------------------------------- */
router.get('/', checkForSession, function(req, res) {
  res.redirect('/dashboard')
});

router.get('/login', function(req, res) {
  res.render('account/login');
});

router.get('/account', checkForSession, function(req, res) {
  res.redirect('/dashboard')
});

router.get('/setup', checkForSession, function(req, res) {
  console.log(req.session.data);
  res.render('account/setup')
});

router.post('/setup', function(req, res) {
  const userCollection = db.collection('users');
  const username = req.session.data.screen_name;
  const fullname = req.body.fullname;
  const hometown = req.body.hometown;
  const email = req.body.email;
  const setupData = {
    username: req.session.data.screen_name,
    fullname: fullname,
    mail: email,
    homeTown: hometown
  };
  userCollection.findOne({
    username: req.session.data.screen_name
  }, function(err, user) {
    if (user) {
      req.session.user = user;
      res.redirect('/dashboard');
    } else {
      userCollection.save(setupData, (err, result) => {
        if (err) return console.log(err);
        req.session.user = setupData;
        res.redirect('/account/');
      });
    }
  });
});

router.get('/logout', function(req, res) {
  const collection = db.collection('users');
  collection.findOne({
    username: req.session.data.username
  }, function(err, user) {
    collection.updateOne(user, {$set: {login: false}}, (error, result) => {
      if (err) return console.log(err)
    })
  })
  req.session.destroy(function() {
    res.redirect('/');
  });
});

function checkForSession(req, res, next) {
  if (req.session.login) {
    res.locals.data = req.session.data;
    res.locals.user = req.session.user;
    next();
  } else {
    res.redirect('/account/login');
  }
}

/* EXPORT ROUTER
----------------------------------------- */
module.exports = router;
