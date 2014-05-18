var passport = require('passport')
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

var authenticate = passport.authenticate('local', {failureRedirect:'/signin', failureFlash:true});

var ensureAuthenticated = function(req, res, done){
  if (req.isAuthenticated()) { return done(); }
  res.redirect('signin') ;
};

module.exports = {
  passport: passport,
  authenticate: authenticate,
  ensureAuthenticated: ensureAuthenticated
};