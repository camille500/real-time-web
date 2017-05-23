module.exports = function(io) {

  /* LOAD ALL DEPENDENCIES
  ----------------------------------------- */
  const express = require('express');
  const router = express.Router();
  const passwordHash = require('password-hash');
  const Twitter = require('twitter');
  const fs = require('fs');
  const jsonFile = 'public/data/live.json';
  let d3data = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));
  let id = 0;

  io.on('connection', function(socket) {
    id = socket.id;
    console.log(id);
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

  router.post('/', function(req, res) {
    const userCollection = db.collection('users');
    const filters = [req.body.filter1, req.body.filter2, req.body.filter3, req.body.filter4, req.body.filter5];
    req.session.filterNames = filters;
    console.log(req.session.filterNames[4])
    req.session.filters = filters.join();
    userCollection.findOne({
      username: req.session.data.screen_name
    }, function(err, user) {
      if (user) {
          userCollection.updateOne(user, {
            $set: {
              filter1: filters[0],
              filter2: filters[1],
              filter3: filters[2],
              filter4: filters[3],
              filter5: filters[4]
            }}, (error, result) => {
              if (err) return console.log(err)
              res.redirect('/dashboard/twitter');
          })
      } else {
        res.redirect('/dashboard/')
      }
    });
  })

  router.get('/twitter', checkForSession, startTwitter, function(req, res) {
    res.render('dashboard/twitter')
  });

  function startTwitter(req, res, next) {
    if(req.session.filters) {
      const consumerKey = process.env.STREAMCONSUMERKEY;
      const consumerSecret = process.env.STREAMCONSUMERSECRET;
      const accessToken = process.env.STREAMACCESSTOKEN;
      const tokenSecret = process.env.STREAMACCESSTOKENSECRET;
      const TwitterClient = new Twitter({
        consumer_key: consumerKey,
        consumer_secret: consumerSecret,
        access_token_key: accessToken,
        access_token_secret: tokenSecret
      });
      const stream = TwitterClient.stream('statuses/filter', {
        track: req.session.filters
      });
      stream.on('data', function(tweet) {
        const filters = req.session.filters.split(',');
        if(tweet.text.includes(filters[0])) {
          d3data.data[0].count++
          fs.writeFile(jsonFile, JSON.stringify(d3data));
          io.emit('filter1', [tweet, filters[0]]);
        } else if(tweet.text.includes(filters[1])) {
          d3data.data[1].count++
          fs.writeFile(jsonFile, JSON.stringify(d3data));
          io.emit('filter2', [tweet, filters[1]]);
        } else if(tweet.text.includes(filters[2])) {
          d3data.data[2].count++
          fs.writeFile(jsonFile, JSON.stringify(d3data));
          io.emit('filter3', [tweet, filters[2]]);
        } else if(tweet.text.includes(filters[3])) {
          d3data.data[3].count++
          fs.writeFile(jsonFile, JSON.stringify(d3data));
          io.emit('filter4', [tweet, filters[3]]);
        } else if(tweet.text.includes(filters[4])) {
          d3data.data[4].count++
          fs.writeFile(jsonFile, JSON.stringify(d3data));
          io.emit('filter5', [tweet, filters[4]]);
        }
      });
      stream.on('error', function(error) {
        console.log(error);
      })
      next()
    } else {
      res.redirect('/dashboard');
    }
  }

  function checkForSession(req, res, next) {
    if (req.session.login) {
      res.locals.data = req.session.data;
      res.locals.user = req.session.user;
      res.locals.filters = req.session.filterNames;
      next();
    } else {
      res.redirect('/account');
    }
  }

  return router;

}
