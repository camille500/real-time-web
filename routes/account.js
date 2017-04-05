/* LOAD ALL DEPENDENCIES
----------------------------------------- */
const express = require('express');
const router = express.Router();
const passwordHash = require('password-hash');

/* ACCOUNT ROUTE
----------------------------------------- */
router.get('/', function(req, res) {
  if (req.session.login) {
    res.locals.data = req.session.data;
    res.render('account/index');
  } else if(!req.session.login) {
    res.redirect('/users/login');
  }
});

/* EXPORT ROUTER
----------------------------------------- */
module.exports = router;
