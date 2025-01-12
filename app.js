var createError = require('http-errors');
var express = require('express');
const compression = require('compression');
const helmet = require('helmet');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

// https://www.youtube.com/watch?v=KjheexBLY4A&ab_channel=DominiCode

var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin'); 

var app = express();

// view engine setup
app.use(cors());
app.use(helmet());
app.use(compression());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/users', usersRouter);
app.use('/admin', adminRouter);

console.log(process.env.NODE_ENV)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
