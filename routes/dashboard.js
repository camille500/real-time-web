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
        socket.on('chat message', function(message) {
        console.log('message: ' + message);
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
