const transactionController = require("../controllers/transactionController");

async function routes(fastify, options) {
  fastify.post(
    "/send",
    {
      schema: {
        description: "Send money",
        tags: ["transaction"],
        summary: "Send money",
        body: {
          type: "object",
          required: ["amount", "toAddress"],
          properties: {
            amount: { type: "number" },
            toAddress: { type: "string" },
          },
        },
        response: {
          200: {
            description: "Successful response",
            type: "object",
            properties: {
              id: { type: "string" },
              amount: { type: "number" },
              timestamp: { type: "string" },
              toAddress: { type: "string" },
              status: { type: "string" },
            },
          },
        },
      },
    },
    transactionController.send
  );

  fastify.post(
    "/withdraw",
    {
      schema: {
        description: "Withdraw money",
        tags: ["transaction"],
        summary: "Withdraw money",
        body: {
          type: "object",
          required: ["amount", "toAddress"],
          properties: {
            amount: { type: "number" },
            toAddress: { type: "string" },
          },
        },
        response: {
          200: {
            description: "Successful response",
            type: "object",
            properties: {
              id: { type: "string" },
              amount: { type: "number" },
              timestamp: { type: "string" },
              toAddress: { type: "string" },
              status: { type: "string" },
            },
          },
        },
      },
    },
    transactionController.withdraw
  );
}

module.exports = routes;
