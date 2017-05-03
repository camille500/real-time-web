/* LOAD ALL DEPENDENCIES
----------------------------------------- */
const express = require('express');
const path = require('path');
const request = require('request');
const session = require('express-session');
const compression = require('compression');
const bodyParser = require('body-parser');

/* DEPENDENCIES CONFIGURATION
----------------------------------------- */
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

/* MONGODB CONFIGURATION
----------------------------------------- */
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
const dbConfig = process.env.MONGODB_URI;

MongoClient.connect(dbConfig, (err, database) => {
  if (err)
    return console.log(err)
  db = database
});

/* SESSIONS CONFIGURATION
----------------------------------------- */
app.use(session({
  secret: process.env.SESSIONSECRET,
  resave: false,
  saveUninitialized: true
}));

/* SET PORT FOR HEROKU
----------------------------------------- */
const port = process.env.PORT || 3000;

/* ENABLE CACHE AND COMPRESSION
----------------------------------------- */
app.set('view cache', true);
app.use(compression());

/* LOAD ALL ROUTERS
----------------------------------------- */
const indexRouter = require('./routes/index');
const accountRouter = require('./routes/account');
const dashboardRouter = require('./routes/dashboard')(io);
const oAuthRouter = require('./routes/oAuth');
//(io)

/* MIDDLEWARE FOR THE VIEW ENGINE
----------------------------------------- */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/* BODY-PARSER FOR READING POST REQUESTS
----------------------------------------- */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/* INITIALIZE ROUTES
----------------------------------------- */
app.use(express.static('public')); // For server static files
app.use('/', indexRouter);
app.use('/account', accountRouter);
app.use('/dashboard', dashboardRouter);
app.use('/twitter', oAuthRouter);

/* 404 PAGE
----------------------------------------- */
app.enable('verbose errors');
app.use(function(req, res, next) {
  res.render('404');
});

/* START THE NPM SERVER
----------------------------------------- */
http.listen(port, function() {
  console.log(`Server started`);
});
