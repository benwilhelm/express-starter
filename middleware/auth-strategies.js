var passport = require('passport')
  , BasicStrategy = require('passport-http').BasicStrategy
  , LocalStrategy = require('passport-local').Strategy
  , User = require('../models/User')
  ;

passport.serializeUser(function(user, done) {
  done(null,user._id);
});

passport.deserializeUser(function(id, done){
  User.findById(id,function(err,user){
    done(err,user) ;
  }) ;
});


  
passport.use(new BasicStrategy(User.getAuthenticated)) ;

passport.use(new LocalStrategy(
  { usernameField:'email' },
  function(username,password,done){
    User.getAuthenticated(username, password, function(err,user){
      if (user) {
        return done(err, user) ;
      } else {
        return done(err, user, {message: 'The email or password that you provided was incorrect'});
      }
    }) ;
  }
));


var exports = {
  passport: passport,
  ensureAuthenticated: function(req, res, next){
    if (req.xhr || !req.accepts('html')) {
      exports.basic.authenticate(req, res, next);
    } else {
      exports.local.ensureAuthenticated(req, res, next);
    }
  },
  
  // Basic Strategy
  basic: {
    authenticate: passport.authenticate('basic', {session:false})
  },
  
  // Local Strategy
  local: {
    authenticate: passport.authenticate('local', {failureRedirect:'/login', failureFlash:true}),
    
    ensureAuthenticated: function(req, res, next){
      if (req.isAuthenticated()) { return next(); }
      res.redirect('/login') ;
    }
  }
};

module.exports = exports;