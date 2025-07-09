require("dotenv").config() // you must write it in the very bottom of file
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const fs = require("fs")
const qs = require("querystring")
const session = require("express-session")
const axios = require("axios")
// routes
const indexRouter = require('./routes/index');
const messagesRouter = require("./routes/messages")

var app = express();

// midlleware
app.use(session({
  secret:"iorghtfolpo-d-"
}))

// login through github
app.get("/auth/github",(req,res)=>{
  const redirect_uri = `https://github.com/login/oauth/authorize?client_id=${process.env.client_id}&redirect_uri=${process.env.callback_url}`
  res.redirect(redirect_uri)
})
app.get("/auth/github/callback",async (req,res)=>{
  const code = req.query.code;
  try {
    const tokenRes = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: process.env.client_id,
        client_secret: process.env.client_secret,
        code,
      },
      { headers: { accept: "application/json" } }
    );

    const access_token = tokenRes.data.access_token;

    const userRes = await axios.get("https://api.github.com/user", {
      headers: { Authorization: `Bearer ${access_token}` }
    });

    const user = userRes.data;
    req.session.loggedUser = user.login
    res.redirect(`/messages/${user.login}`);
  } catch (err) {
    res.send("GitHub login failed.");
  }
})
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
