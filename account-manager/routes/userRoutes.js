const userController = require("../controllers/userController");

async function routes(fastify, options) {
  fastify.post(
    "/register",
    {
      schema: {
        description: "Register a new user",
        tags: ["user"],
        summary: "Register user",
        body: {
          type: "object",
          required: ["username", "password"],
          properties: {
            username: { type: "string" },
            password: { type: "string" },
          },
        },
        response: {
          200: {
            description: "Successful response",
            type: "object",
            properties: {
              id: { type: "string" },
              username: { type: "string" },
            },
          },
        },
      },
    },
    userController.register
  );

  fastify.get(
    "/user/:id",
    {
      schema: {
        description: "Get user by ID",
        tags: ["user"],
        summary: "Get user",
        params: {
          type: "object",
          properties: {
            id: { type: "string" },
          },
        },
        response: {
          200: {
            description: "Successful response",
            type: "object",
            properties: {
              id: { type: "string" },
              username: { type: "string" },
            },
          },
        },
      },
    },
    userController.getUser
  );
}

module.exports = routes;
