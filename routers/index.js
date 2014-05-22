var app = require('../app')
  , appRoot = app.get('appRoot')
  , express = require('express')
  , router = express.Router()
  , authStrategies = require(appRoot + '/middleware/auth-strategies')
  , passport = authStrategies.passport
  ;

router.route('/')
.get(function(req, res, next){
  res.locals.pageTitle = "Home";
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

module.exports = router;