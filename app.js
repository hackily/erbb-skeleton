const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
//const favicon = require('serve-favicon'); //Uncomment once you have a favicon
const logger = require('morgan'); //A logger middleware that logs HTTP requests
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const index = require('./server/routes/index');

// initialise express
var app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//Can set to any other view engine
app.engine('html', hbs({ extname: 'html' }));
app.set('view engine', 'html'); 

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico'))); //Uncomment once there's a favicon.
app.use(logger('dev')); //Set up morgan logging with 'dev' verbosity 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


// public assets are served before any dynamic requests
app.use(express.static(path.join(__dirname, 'public')));

//Routes, initially found in ./server/routes/index.js
app.use('/', index);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({error: err.message});
});

module.exports = app;