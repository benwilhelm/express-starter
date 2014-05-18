var passport = require('passport')
  , BasicStrategy = require('passport-http').BasicStrategy
  , User = require('../models/User')
  ;
  
passport.use(new BasicStrategy(
  function(username,password,done){
    User.getAuthenticated(username, password, function(err,user){
      done(err,user) ;
    }) ;
  }
)) ;

module.exports = {
  passport: passport,
  authenticate: passport.authenticate('basic', {session:false})
};