var app = require('../app')
  , appRoot = app.get('appRoot')
  , express = require('express')
  , router = express.Router()
  , authStrategies = require(appRoot + '/middleware/auth-strategies')
  , passport = authStrategies.passport
  , rewrite = require('connect-modrewrite')
  ;

router.use(authStrategies.ensureAuthenticated);

router.route("/users/new")
.get(function(req, res){
  res.send("users.new not yet implemented");
});

router.route('/users')
.get(function(req, res){
  res.send("users.index not yet implemented");
});

router.route('/users/:id')
.get(function(req, res){
  res.send("users.show not yet implemented");
});

module.exports = router;