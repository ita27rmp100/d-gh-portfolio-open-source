require("dotenv").config() // you must write it in the very bottom of file
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const fs = require("fs")
const qs = require("querystring")
const session = require("express-session")

// routes
const indexRouter = require('./routes/index');
const messagesRouter = require("./routes/messages")

var app = express();

// midlleware
app.use(session({
  secret:"iorghtfolpo-d-"
}))

// login through github




// the form 
app.post('/',(req,res)=>{
  let body = ''
  req.on('data',(data)=>{
    body += data
  })
  req.on("end",()=>{
    let result = qs.parse(body) , UserRecievedMsg
    const UserJSON_file = `${__dirname}/routes/users/${req.session.username}.json`
    fs.readFile(UserJSON_file,"utf-8",(err,data)=>{
      if(err){
        console.log(err)
        return
      }
      UserRecievedMsg = JSON.parse(data)
      UserRecievedMsg[String(Object.keys(UserRecievedMsg).length+1)] = [
        result.fullname,result.email,result.message
      ]
      fs.writeFile(UserJSON_file,JSON.stringify(UserRecievedMsg,null,2),(err)=>{
        if(err){
          console.log(err)
        }
        else{
          console.log("Added successfully")
        }
        res.redirect(`/${req.session.username}`)
      })
    })
  })
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
app.use("/messages",messagesRouter)
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
