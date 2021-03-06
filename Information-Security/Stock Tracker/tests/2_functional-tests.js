/*
 *
 *
 *       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]-----
 *       (if additional are added, keep them at the very end!)
 */

var chaiHttp = require("chai-http");
var chai = require("chai");
var assert = chai.assert;
var server = require("../server");
var expect = chai.expect;
chai.use(chaiHttp);

suite("Functional Tests", function () {
  suite("GET /api/stock-prices => stockData object", function () {
    test("1 stock", function (done) {
      chai
        .request(server)
        .get("/api/stock-prices")
        .query({ stock: "goog" })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.property(res.body, "stockData");
          assert.property(res.body.stockData, "stock");
          assert.equal(res.body.stockData.stock, "goog");
          done();
        });
    });

    test("1 stock with like", function (done) {
      chai
        .request(server)
        .get("/api/stock-prices")
        .query({ stock: "goog", like: "true" })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.stockData.likes, 1);
          done();
        });
    });

    test("1 stock with like again (ensure likes arent double counted)", function (done) {
      chai
        .request(server)
        .get("/api/stock-prices")
        .query({ stock: "goog", like: "true" })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.stockData.likes, 1);
          done();
        });
    });

    test("2 stocks", function (done) {
      chai
        .request(server)
        .get("/api/stock-prices?stock=goog&stock=msft")
        .end(function (err, res) {
          assert.equal(res.status, 200);
          console.log(res.body);
          assert.equal(res.body.stockData[0].stock, "goog");
          assert.equal(res.body.stockData[1].stock, "msft");
          done();
        });
    });

    test("2 stocks with like", function (done) {
      chai
        .request(server)
        .get("/api/stock-prices?stock=goog&stock=msft&like=true")
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.stockData[0].rel_likes, 1);
          assert.equal(res.body.stockData[1].rel_likes, -1);
          done();
        });
    });
  });
});
