const { test } = require("node:test");
const assert = require("assert");
const fastify = require("fastify")();
const transactionRoutes = require("../routes/transactionRoutes");
const supertest = require("supertest");

fastify.register(transactionRoutes);

test("Send money", async (t) => {
  const response = await supertest(fastify.server)
    .post("/send")
    .send({ amount: 100, toAddress: "address1" });

  assert.strictEqual(response.status, 200);
  assert.strictEqual(response.body.amount, 100);
  assert.strictEqual(response.body.toAddress, "address1");
  assert.ok(response.body.status);
});

test("Withdraw money", async (t) => {
  const response = await supertest(fastify.server)
    .post("/withdraw")
    .send({ amount: 50, toAddress: "address1" });

  assert.strictEqual(response.status, 200);
  assert.strictEqual(response.body.amount, 50);
  assert.strictEqual(response.body.toAddress, "address1");
  assert.ok(response.body.status);
});

test("Get transactions for an account", async (t) => {
  const accountId = "testAccountId";

  const response = await supertest(fastify.server).get(
    `/transactions/${accountId}`
  );

  assert.strictEqual(response.status, 200);
  assert.ok(Array.isArray(response.body));
});
