process.env.NODE_ENV = 'test' ;
var app = require('../../app')
  , assert = require('assert')
  , async = require('async')
  , crypto = require('crypto')
  , fixtures = require('pow-mongoose-fixtures')
  , helpers = require('../test-helpers')
  , passportStub = require('passport-stub')
  , should = require('should')
  , store = require('../../lib/db')
  ,   db = store.database
  , User = require('../../models/User')
  , testData = {
      foo: 'bar',
      bif: 'baz'
    }
  ;

passportStub.install(app);

describe("Integration - Index", function(){

  var suite = this;

  before(function(done){
    async.series([
      function(cb){ helpers.emptyCollections(cb); },
      function(cb){ fixtures.load(__dirname + '/../fixtures/users.js', db, cb); },
      function(cb){
        User.findOne({email:'user1@example.com'}, function(err, u){
          suite.user1 = u;
          cb();
        });
      }
    ],done);
  }) ;


  describe("/login", function(){
  
    it("should log user in when POSTed with correct credentials", function(done){
      assert.ok(false, 'write this test');
      done();
    });
  });
});