module.exports = function(io) {

  /* LOAD ALL DEPENDENCIES
  ----------------------------------------- */
  const express = require('express');
  const router = express.Router();
  const passwordHash = require('password-hash');
  const Twitter = require('twitter');
  // const fs = require('fs');

  let username = 'unknown'
  let chosenWord = false;
  const userList = {};
  const roomList = [];
  let usercount = 0;

  io.on('connection', function(socket) {

    socket.on('add user', function() {
      socket.username = username;
      socket.keyword = chosenWord;
      userList[username] = socket;
      // console.log(userList[username].keyword)
      io.emit('all users', Object.keys(userList));
    });

  });

  /* ACCOUNT ROUTE
  ----------------------------------------- */
  router.get('/', checkForSession, function(req, res) {
    if(!req.session.filters) {
      res.render('dashboard/index');
    } else {
      res.redirect('dashboard/twitter');
    }
  });

  router.post('/', checkForSession, function(req, res) {
    chosenWord = req.body.selectedKeyword;
    res.redirect('dashboard/twitter');
  });

  router.get('/twitter', checkForSession, function(req, res) {
    res.render('dashboard/twitter')
  });

  function checkForSession(req, res, next) {
    if (req.session.login) {
      username = req.session.user.username;
      res.locals.data = req.session.data;
      res.locals.user = req.session.user;
      next();
    } else {
      res.redirect('/account');
    }
  }

  return router;

}
