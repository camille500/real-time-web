/* EXPORT ROUTER
----------------------------------------- */
module.exports = function(io) {

  /* LOAD ALL DEPENDENCIES
  ----------------------------------------- */
  const express = require('express');
  const router = express.Router();
  const passwordHash = require('password-hash');

  io.on("connection", function(socket) {
    console.log('connection made');
    socket.on('chat message', function(msg, user, us){
      io.emit('chat message', msg, user, us);
    });
  });

  /* ACCOUNT ROUTE
  ----------------------------------------- */
  router.get('/', checkForSession, function(req, res) {
      res.locals.data = req.session.data;
      res.render('dashboard/chat');
  });

  function checkForSession(req, res, next) {
    if(req.session.login) {
      next();
    } else {
      res.redirect('/account');
    }
  }

  return router;

}
