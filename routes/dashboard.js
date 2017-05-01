/* LOAD ALL DEPENDENCIES
----------------------------------------- */
const express = require('express');
const router = express.Router();
const passwordHash = require('password-hash');

/* ACCOUNT ROUTE
----------------------------------------- */
router.get('/', checkForSession, function(req, res) {
  res.render('dashboard/index');
});

router.get('/twitter', checkForSession, function(req, res) {
  res.render('dashboard/twitter')
});

function checkForSession(req, res, next) {
  if (req.session.login) {
    res.locals.data = req.session.data;
    res.locals.user = req.session.user;
    next();
  } else {
    res.redirect('/account');
  }
}

module.exports = router;
