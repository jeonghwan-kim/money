'use strict';

var should = require('should'),
    app = require('../../../server'),
    api = require('../../../lib/controllers/api-expense'),
    request = require('supertest');

var testUid = 10;

describe('getMonthlyHistory()', function() {
  it('월별 지출 목록을 가져올 수 있다.', function(done) {
    api.getMonthlyHistory(testUid, '2014-04', function(result, data) {
      console.log(result, data);

      result.should.be.true;
      data.should.be.an.instanceof(Array);
      done();
    });
  });
});

describe('getMonthlyHistory()', function() {
  it('월별 지출 목록을 가져올 수 있다.', function(done) {
    api.getMonthlyHistory(testUid, '2014-04', function(result, data) {
      result.should.be.true;
      data.should.be.an.instanceof(Array);
      done();
    });
  });
});

describe('getMonthList()', function() {
  it('지출을 기록한 월 목록을 가져올수 있다.', function(done) {
    api.getMonthList(testUid, function(result, data) {
      result.should.be.true;
      data.should.be.an.instanceof(Array);
      done();
    });
  });
});

describe('insert()', function() {
  it('지출을 입력/수정/삭제 할수 있다.', function(done) {
    // 입력
    api.insert('2014-05-01', 'test input', 4500, testUid, function(result, insertId) {
      result.should.be.true;
      insertId.should.be.a.Number;

      // 수정
      api.update(insertId, testUid, '2014-05-02', 'updated text', 5000,
        function(result, expenseId) {
        result.should.be.true;
        expenseId.should.be.eql(insertId);

        //  삭제
        api.remove(insertId, testUid, function(result, data) {
          result.should.be.true;
          data.should.be.eql(200);
          done();
        });
      });
    });
  });
});