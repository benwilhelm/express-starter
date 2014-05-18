var authenticate = function(req,res,next) {
  var User = require('../models/User')
  , header=req.headers.authorization || ''         // get the header
  , token=header.split(/\s+/).pop() || ''          // and the encoded auth token
  , auth=new Buffer(token, 'base64').toString()    // convert from base64
  , parts=auth.split(/:/)                          // split on colon
  , apiKey=parts[0]
  , hash=parts[1]
  ;
  
  
  User.verifyHmac(apiKey, hash, req.body, function(err, user, reason){
    if (user) {
      req.user = user ;
      next() ;
    } else {
      res.status(401) ;
      res.write("Unauthorized") ;
      res.send() ;
    }
  });
};

module.exports = {
  authenticate:authenticate
};