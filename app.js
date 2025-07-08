require("dotenv").config() // you must write it in the very bottom of file
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const fs = require("fs")
const qs = require("querystring")
var indexRouter = require('./routes/index');

var app = express();

// the form 
app.post('/',(req,res)=>{
  let body = ''
  req.on('data',(data)=>{
    body += data
  })
  req.on("end",()=>{
    let result = qs.parse(body)
    console.log(result)
  })
  res.redirect('/')
})


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter)

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
