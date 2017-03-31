/* LOAD ALL DEPENDENCIES
----------------------------------------- */
const express = require('express');
const path = require('path');
const request = require('request');
const compression = require('compression');
const bodyParser = require('body-parser');
const app = express();

/* MONGO CONFIGURATION
----------------------------------------- */
const MongoClient = require("mongodb").MongoClient;
require('dotenv').config();
const dbConfig = process.env.MONGODB_URI;

MongoClient.connect(dbConfig, (err, database) => {
  if (err) return console.log(err)
  db = database
});

/* SET PORT FOR HEROKU
----------------------------------------- */
const port = process.env.PORT || 3000;
const host = process.env.HOST ||'0.0.0.0';

/* ENABLE CACHE AND COMPRESSION
----------------------------------------- */
app.set('view cache', true);
app.use(compression());

/* LOAD ALL ROUTERS
----------------------------------------- */
const indexRouter = require('./routes/index');

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

/* 404 PAGE
----------------------------------------- */
app.enable('verbose errors');
app.use(function(req, res, next) {
   res.render('404');
});

/* START THE NPM SERVER
----------------------------------------- */
app.listen(port, host, function() {
    console.log(`Server started on port ${port}`);
});
