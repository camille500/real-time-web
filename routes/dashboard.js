/* LOAD ALL DEPENDENCIES
----------------------------------------- */
const express = require('express');
const router = express.Router();
const passwordHash = require('password-hash');

/* ACCOUNT ROUTE
----------------------------------------- */
router.get('/', checkForSession, function(req, res) {
    res.locals.data = req.session.data;
    res.render('dashboard/index');
});

router.get('/chat', checkForSession, function(req, res) {
      req.app.io.on('connection', function(socket){
         socket.broadcast.emit('user connected');
        console.log('a user connected');
      socket.on('disconnect', function(){
        console.log('user disconnected');
      });
      socket.on('chat message', function(message){
          req.app.io.emit('chat message', message);
      });
    });
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

/* EXPORT ROUTER
----------------------------------------- */
module.exports = router;
