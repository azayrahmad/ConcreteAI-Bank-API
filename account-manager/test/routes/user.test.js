const { test } = require("node:test");
const assert = require("assert");
const fastify = require("fastify")();
const userRoutes = require("../routes/userRoutes");
const prisma = require("../prisma");

fastify.register(userRoutes);

test("Register a new user", async (t) => {
  const response = await fastify.inject({
    method: "POST",
    url: "/register",
    payload: { username: "testuser", password: "password" },
  });

  assert.strictEqual(response.statusCode, 200);
  const body = JSON.parse(response.payload);
  assert.ok(body.id);
  assert.strictEqual(body.username, "testuser");
});

test("Get user by ID", async (t) => {
  const registerResponse = await fastify.inject({
    method: "POST",
    url: "/register",
    payload: { username: "testuser", password: "password" },
  });

  const userId = JSON.parse(registerResponse.payload).id;

  const response = await fastify.inject({
    method: "GET",
    url: `/user/${userId}`,
  });

  assert.strictEqual(response.statusCode, 200);
  const body = JSON.parse(response.payload);
  assert.strictEqual(body.id, userId);
  assert.strictEqual(body.username, "testuser");
});

test.after(async () => {
  await prisma.user.deleteMany(); // Clean up the test data
  await fastify.close();
});
