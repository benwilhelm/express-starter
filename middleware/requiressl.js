module.exports = function(req,res,next) {

  var shouldUse = process.env.NODE_ENV === 'production' || process.env.USE_SSL ;
  var notSecure = req.headers['x-forwarded-proto'] !== 'https' ;

  if (shouldUse && notSecure) {
    res.send("This route may only be accessed over SSL.");
  } else {
    next() ;
  }
};