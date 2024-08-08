const accountController = require("../controllers/accountController");

async function accountRoutes(fastify, options) {
  fastify.post(
    "/account",
    {
      schema: {
        description: "Create a new account for a user",
        body: {
          type: "object",
          required: ["userId", "type"],
          properties: {
            userId: { type: "string" },
            type: { type: "string" },
          },
        },
        response: {
          200: {
            type: "object",
            properties: {
              id: { type: "string" },
              type: { type: "string" },
              userId: { type: "string" },
            },
          },
        },
      },
    },
    accountController.registerAccount
  );

  fastify.get(
    "/account/:accountId/transactions",
    {
      schema: {
        description: "Get all transactions for a specific account",
        params: {
          type: "object",
          required: ["accountId"],
          properties: {
            accountId: { type: "string" },
          },
        },
        response: {
          200: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: { type: "string" },
                amount: { type: "number" },
                timestamp: { type: "string", format: "date-time" },
                toAddress: { type: "string" },
                accountId: { type: "string" },
              },
            },
          },
        },
      },
    },
    accountController.getTransactions
  );
}

module.exports = accountRoutes;
