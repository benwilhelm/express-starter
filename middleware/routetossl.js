module.exports = function(req,res,next) {
  var shouldUse = process.env.NODE_ENV === 'production' || process.env.USE_SSL ;
  var notSecure = req.headers['x-forwarded-proto'] !== 'https' ;

  if (shouldUse && notSecure) {
    res.redirect('https://'+req.host+req.originalUrl);
  } else {
    next() ;
  }
};