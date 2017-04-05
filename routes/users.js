/* LOAD ALL DEPENDENCIES
----------------------------------------- */
const express = require('express');
const router = express.Router();
const passwordHash = require('password-hash');

/* INDEX ROUTE
----------------------------------------- */
router.get('/', function(req, res) {
  if (req.session.login) {
    res.redirect('/account')
  } else {
    res.redirect('/users/login');
  }
});

router.get('/login', function(req, res) {
  res.render('users/login');
});

router.post('/login', function(req, res) {
  const collection = db.collection('users');
  const loginName = req.body.username;
  const loginPassword = req.body.password;
  collection.findOne({
    username: loginName
  }, function(err, user) {
    if (user) {
      const pwCheck = passwordHash.verify(loginPassword, user['password']);
      if (pwCheck === true) {
        req.session.login = true;
        req.session.data = user;
        res.redirect('/account/');
      }
    } else {
      res.redirect('/users/')
    }
  });
});

router.get('/register', function(req, res) {
  res.locals.message = "Vul alle gegevens in";
  res.render('users/register');
});

router.post('/register', function(req, res) {
  const collection = db.collection('users');
  const regName = req.body.username;
  const regMail = req.body.mail;
  const regHometown = req.body.hometown;
  const regPassword = passwordHash.generate(req.body.password);
  const regData = {
    username: regName,
    mail: regMail,
    homeTown: regHometown,
    password: regPassword
  };
  collection.findOne({
    username: regName
  }, function(err, user) {
    if (user) {
      res.locals.message = "De gekozen gebruikersnaam bestaat al";
      res.render('users/register');
    } else {
      collection.save(regData, (err, result) => {
        if (err) return console.log(err);
        res.redirect('/users/login');
      });
    }
  });
});

router.get('/logout', function(req, res) {
  req.session.destroy(function() {
    res.redirect('/');
  });
});

/* EXPORT ROUTER
----------------------------------------- */
module.exports = router;
