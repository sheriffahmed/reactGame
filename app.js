var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator'); // for FUN validation
///AUTH added 02-07-18
var session = require('express-session');
var passport = require('passport');
////
var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
///
app.use(expressValidator()); //for FUN validation
///
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

///AUTH added 02-07-18
app.set('trust proxy', 1); // not sure if i need this
app.use(session({
  secret: "\x02\xf3\xf7r\t\x9f\xee\xbbu\xb1\xe1\x90\xfe'\xab\xa6L6\xdd\x8d[\xccO\xfe",
  resave: false, // how many times session is resaved 
 // saveUninitialized: true // set to false to start
 saveUninitialized: false // set to false to start

}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

//////////
app.use('/', index);
app.use('/users', users);
///?? idk
//app.use('/users/profile', users);


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
  res.render('error');
});

module.exports = app;
