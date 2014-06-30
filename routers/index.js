var app = require('../app')
  , appRoot = app.get('appRoot')
  , authStrategies = require(appRoot + '/middleware/auth-strategies')
  , express = require('express')
  , h = require(appRoot + '/lib/helpers')
  , router = express.Router()
  , passport = authStrategies.passport
  ;

router.route('/')
.get(function(req, res, next){
  res.locals.pageTitle = "Home".format();
  res.render("index", {layout: "layouts/site"});
});

router.route("/about")
.get(function(req, res, next){
  res.locals.pageTitle = "About";
  res.render('about', {layout: 'layouts/site'});
});

router.route("/login")
.get(function(req, res, next){
  res.locals.pageTitle = "Log In";
  res.render('login', {layout: 'layouts/site'});
})
.post(authStrategies.local.authenticate, function(req, res, next){
  var id = req.user._id;
  res.redirect("/users/" + id);
});

router.route('/logout')
.get(function(req, res, next){
  req.logout();
  res.redirect('login');
});

router.route("/credentials")
.get(authStrategies.basic.authenticate, function(req, res, next){
  res.type('application/json') ;
  var resp = h.normalResponse({
    apiKey: req.user.apiKey,
    apiSecret: req.user.apiSecret
  }) ;
  res.send(resp) ;
});

module.exports = router;