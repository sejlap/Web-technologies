var request = require("request"),
    assert = require('assert'),
    forma = require("../index"),
    osoblje_url = "http://localhost:8080/osoblje";
    sale_url="http://localhost:8080/sala";
    zauzeca_url ="http://localhost:8080/ispis";
    rez_url ="http://localhost:8080/termin";
    const supertest = require("supertest");

   const app = require("../index.js");

    var chai = require('chai');
    global.expect = chai.expect;

describe(" GET /osoblje ", function() {
    describe("Vraća svo osoblje", function() {
        it('status code 200 OK', (done) => {
            this.timeout(10000);
          request.get(osoblje_url, function(err, res, body) {
                  assert.equal(200, res.statusCode);
              }).finally(done());   
         });
    });
    describe('Duzina', function() {
        it('Pocetna duzina niza treba biti 3', (done) => {
            this.timeout(10000);
            request.get(osoblje_url, function(err, res, body) {
                    assert.equal(3, JSON.parse(res.body).length);
                }).finally(done());
        });
    });
    describe('Treca osoba', function() {
        it('Treba vratiti trecu osobu', (done)=> {
            this.timeout(10000);
            request.get(osoblje_url, function(err, res, body) {
              var rez=JSON.parse(res.body);
                  assert.equal("Test Test",rez[2].ime + " " + rez[2].prezime);
              }).finally(done());
          });
      });
  });
describe(" GET /sala ", function() {
    describe("Treba vratiti sve sale", function() {
        it('status code 200 OK', (done) => {
            this.timeout(10000);
            request.get(sale_url, function(err, res, body) {
                    assert.equal(200, res.statusCode);
                }).finally(done());   
           });
      });
    describe('Duzina', function() {
          it('Pocetna duzina niza je 2', (done)=> {
            this.timeout(10000);
              request.get(sale_url, function(err, res, body) {
                      assert.equal(2, JSON.parse(res.body).length);
                      done();
                  }).finally(done());
          });
    });
    describe('Prva sala', function() {
        it('Prva sala je 1-11', (done)=> {
            this.timeout(10000);
            request.get(sale_url, function(err, res, body) {
              var rez=JSON.parse(res.body);
                    assert.equal("1-11", rez[0].naziv);
                }).finally(done());;
        });
    });
});

describe(" GET /ispis prikazuje zauzeca ", function() {
    describe("prima sva zauzeca", function() {
        it('status code 200 OK', (done) => {
            this.timeout(10000);
          request.get(zauzeca_url, function(err, res, body) {
                  assert.equal(200, res.statusCode);
              }).finally(done());   
         });
    });
    describe('Duzina', function() {
          it('Pocetna duzina niza je 1', (done) => {
            this.timeout(10000);
              request.get(zauzeca_url, function(err, res, body) {
                      assert.equal(1, JSON.parse(res.body).length);
                  }).finally(done());
          });
    });
    describe('Prva osoba', function() {
        it('Prva osoba je Nekić', (done) => {
          this.timeout(10000);
            request.get(zauzeca_url, function(err, res, body) {
                var rez=JSON.parse(res.body);
                assert.equal("Neko Nekić",rez[0].ime + " " + rez[0].prezime);
                }).finally(done());
        });
  });
});

describe(" GET /termin prikazuje sve rezervacije ", function() {
    describe("prima sve", function() {
        it('status code 200 OK', (done) => {
            this.timeout(10000);
          request.get(rez_url, function(err, res, body) {
                  assert.equal(200, res.statusCode);
              }).finally(done());   
         });
});
    describe('Duzina', function() {
          it('Pocetna duzina niza je 2', (done) => {
            this.timeout(10000);
              request.get(rez_url, function(err, res, body) {
                      assert.equal(1, JSON.parse(res.body).length);
                  }).finally(done());
          });
    });
  });
