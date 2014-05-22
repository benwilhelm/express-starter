var express = require('express')
  , app = module.exports = express()
  , bodyParser = require('body-parser')
  , cookieParser = require('cookie-parser')
//  , authBasic = require('./middleware/authBasic')
  , authLocal = require('./middleware/authLocal')
//  , authHmac = require('./middleware/authHmac')
  , db = require('./lib/db')
  , flash = require('connect-flash')
  , hbs = require('hbs')
  , passport = require('passport')
//  , requireSSL = require('./middleware/requiressl')
//  , routeToSSL = require('./middleware/routetossl')
  , methodOverride = require('method-override')
  , session = require('express-session')
  ;

app.set('appRoot', __dirname);
app.set('view engine', 'html') ;
app.engine('html', hbs.__express) ;

app.use(bodyParser());
app.use(methodOverride());
app.use(cookieParser());

// REGENERATE THIS SECRET!
app.use(session({secret:'t8f8vR89z88uIW1SbB6Bl9doH0JQa75d03mp'}));

app.use(flash());
app.use(passport.initialize()) ;
app.use(passport.session()) ; 
app.use(express.static('public')) ;


app.locals.year = new Date().getFullYear();
app.locals.siteTitle = "Site Name";

app.use(require(__dirname + '/routers/index'));
app.use(require(__dirname + '/routers/users'));


if (process.env.NODE_ENV === 'test') {
  process.env.PORT = 3001 ;
}

app.listen(process.env.PORT || 3000) ;

