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
    socket.on('chat message', function(message, user, timestamp) {
      saveToDatabase(message, user, timestamp)
      io.emit('chat message', message, user);
    });
  });

  /* ACCOUNT ROUTE
  ----------------------------------------- */
  router.get('/', checkForSession, function(req, res) {
    const chatCollection = db.collection('chat');
    chatCollection.find().toArray(function(err, results) {
      res.locals.chat = results;
      res.locals.data = req.session.data;
      res.render('dashboard/chat');
    })
  });

  function checkForSession(req, res, next) {
    if (req.session.login) {
      next();
    } else {
      res.redirect('/account');
    }
  }

  function saveToDatabase(message, user, timestamp) {
    const chatCollection = db.collection('chat');
    const userCollection = db.collection('users');
    const saveData = {
      username: user,
      message: message,
      timestamp: timestamp
    }
    userCollection.findOne({
      username: user
    }, function(err, user) {
      if (user) {
        chatCollection.save(saveData, (err, result) => {
          if (err)
            return console.log(err);
          }
        );
      } else {
        console.log('error');
      }
    });
  }

  return router;

}
