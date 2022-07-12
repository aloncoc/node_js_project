const index = require("../app");
const should = require("should");
const assert = require("assert");
const expect = require("chai").expect;
const axios = require("axios").default;
const supertest = require("supertest");

const server = supertest.agent("localhost:8081");

describe("Test REST api", () => {
  it("testing GET", (done) => {
    server.get("/reports").end((err, res) => {
      res.status.should.equal(200);
      done();
    });
  });
  it("testing POST", (done) => {
    server
      .post("/reports")
      .send({ license_plate: "10-101-11", driver_id: 1220, speed: 139 })
      .end((err, res) => {
        res.status.should.equal(201);
        done();
      });
  });
  it("testing PUT", (done) => {
    server
      .put("/reports/5")
      .send({ license_plate: "55-535-11", driver_id: 1420, speed: 121 })
      .end((err, res) => {
        res.status.should.equal(200);
        done();
      });
  });
  it("testing DELETE", (done) => {
    server
      .delete("/reports/5")
      .send({ license_plate: "55-535-11", driver_id: 1420, speed: 121 })
      .end((err, res) => {
        res.status.should.equal(200);
        done();
      });
  });
});