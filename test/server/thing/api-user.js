'use strict';

var should = require('should'),
    app = require('../../../server'),
    apiUser = require('../../../lib/controllers/api-user'),
    request = require('supertest');

describe('GET /api/signup', function() {
  var testEmail = 'test12345@gmail.com';

  it('회원 가입을 할 수 있다.', function(done) {
    request(app)
      .post('/api/signup')
      .send({email:testEmail, password:"pw"})
      .expect(201)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.have.ownProperty('newId');

        // 테스트 계정 삭제
        apiUser.deleteUser(testEmail, function(result) {
          result.should.be.true;
          done();
        });
      });
  });
});

describe('GET /api/signin', function() {
  var testEmail = 'test12345@gmail.com';
  var testPassword = 'test12345';

  it('로그인을 할 수 있다.', function(done) {
    // 신규 사용자 생성
    apiUser.createUser(testEmail, testPassword, function(result, data) {
      result.should.be.true;

      // 사인인 테스트
      request(app)
        .post('/api/signin')
        .send({email:testEmail, password:testPassword})
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          res.body.should.have.ownProperty('sid');

          // 테스트 계정 삭제
          apiUser.deleteUser(testEmail, function(result) {
            result.should.be.true;
            done();
          });
        });
    });
  });
});