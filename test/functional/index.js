process.env.NODE_ENV = 'test' ;
var app = require('../../app')
  , assert = require('assert')
  , async = require('async')
  , crypto = require('crypto')
  , fixtures = require('pow-mongoose-fixtures')
  , helpers = require('../test-helpers')
  , passportStub = require('passport-stub')
  , request = require('supertest')
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
      var data = {
        email: 'user1@example.com',
        password: 'password123'
      };
      
      request(app)
      .post('/login')
      .send(data)
      .end(function(err,res){
        if (err) console.error(err);
        assert.equal(err, null, "should be no error on submit");
        res.error.should.eql(false,"response should not contain an error");
        res.headers.location.should.match(/^\/users\/[\w\d]{24}$/, 'should redirect to account page');
        res.status.should.eql(302, 'should send 302');
        done();
      });
    });
    
    it("should not log user in and should redirect to itself with bad email", function(done){
      var data = {
        email: 'wrong@example.com',
        password: 'password123'
      };
      request(app)
      .post('/login')
      .send(data)
      .end(function(err,res){
        if (err) console.error(err);
        assert.equal(err, null, "should be no server error on submit") ;
        res.error.should.eql(false, "should not return an error") ;
        assert.equal(res.headers.location,'/login','Should redirect to /login') ;
        done();
      });
    });
    
    it("should not log user in and should redirect to itself with bad password", function(done){
      var data = {
        email: 'user1@example.com',
        password: 'badpassword'
      };
      request(app)
      .post('/login')
      .send(data)
      .end(function(err,res){
        if (err) console.error(err);
        assert.equal(err, null, "should be no server error on submit") ;
        res.error.should.eql(false, "should not return an error") ;
        assert.equal(res.headers.location,'/login','Should redirect to /login') ;
        done();
      });
    });
    
    it("should not log user in and should redirect to itself with bad email and password", function(done){
      var data = {
        email: 'wrong@example.com',
        password: 'badpassword'
      };
      request(app)
      .post('/login')
      .send(data)
      .end(function(err,res){
        if (err) console.error(err);
        assert.equal(err, null, "should be no server error on submit") ;
        res.error.should.eql(false, "should not return an error") ;
        assert.equal(res.headers.location,'/login','Should redirect to /login') ;
        done();
      });
    });
  });
  
  
  describe("/credentials", function(){
    it("should require username/password for GET request",function(done){
      request(app)
      .get('/credentials')
      .end(function(err,res){
        assert.equal(res.status,'401') ;
        assert.equal(res.text,'Unauthorized') ;
        done() ;
      }) ;
    }) ;
  
    it("should require *valid* u/p compbo for GET request", function(done){
      request(app)
      .get('/credentials')
      .auth('user321@example.com','password123')
      .end(function(err,res){
        assert.equal(res.status,'401') ;
        assert.equal(res.text,'Unauthorized') ;
        done() ;
      }) ;
    }) ;

    it("should return api key/secret with valid u/p", function(done){
      request(app)
      .get('/credentials')
      .auth('user1@example.com','password123')
      .end(function(err,res){
        if (err) console.error(err) ;      
        assert.equal(err,null) ;

        assert.equal(res.body.payload.err, null) ;
        assert.equal(res.body.payload.err_msg, null) ;
        res.body.payload.apiKey.should.eql(suite.user1.apiKey) ;
        res.body.payload.apiSecret.should.eql(suite.user1.apiSecret) ;
        done() ;
      });
    }) ;
  });
  
});