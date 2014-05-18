var express = require('express')
  , app = express()
//  , authBasic = require('./middleware/authBasic')
//  , authLocal = require('./middleware/authLocal')
//  , authHmac = require('./middleware/authHmac')
  , db = require('./lib/db')
  , flash = require('connect-flash')
  , hbs = require('hbs')
//  , passport = require('passport')
//  , requireSSL = require('./middleware/requiressl')
//  , routeToSSL = require('./middleware/routetossl')
  ;

app.set('view engine', 'html') ;
app.engine('html', hbs.__express) ;

app.configure(function(){
  app.use(express.urlencoded()) ; //  <---- These replace express.bodyParser() because of security concerns. 
  app.use(express.json()) ;       //  <---- See https://github.com/senchalabs/connect/wiki/Connect-3.0
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({secret:'t8f8vR89z88uIW1SbB6Bl9doH0JQa75d03mp'}));
  app.use(flash());
//  app.use(passport.initialize()) ;
//  app.use(passport.session()) ; 
  app.use(express.static('public')) ;
}) ;


if (process.env.NODE_ENV === 'test') {
  process.env.PORT = 3001 ;
}

app.listen(process.env.PORT || 3000) ;
module.exports = app ;

