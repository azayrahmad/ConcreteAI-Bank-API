"use strict";

const {
  verifySession,
} = require("supertokens-node/recipe/session/framework/fastify");
const Session = require("supertokens-node/recipe/session");
const EmailPassword = require("supertokens-node/recipe/emailpassword");

module.exports = async function (fastify, opts) {
  fastify.post("/auth/signup", async (request, reply) => {
    // SuperTokens will handle the signup process
  });

  fastify.post("/auth/signin", async (request, reply) => {
    // SuperTokens will handle the signin process
  });

  fastify.get(
    "/auth/user",
    { preHandler: verifySession() },
    async (request, reply) => {
      try {
        const session = await Session.getSession(request, reply);
        const userId = session.getUserId();
        const userInfo = await EmailPassword.getUserById(userId);

        if (userInfo) {
          reply.send({
            message: "User information retrieved",
            user: {
              id: userInfo.id,
              email: userInfo.email,
            },
          });
        } else {
          reply.code(404).send({ error: "User not found" });
        }
      } catch (err) {
        console.error("Get user info error:", err);
        reply.code(500).send({
          error: "Internal server error while fetching user info",
          details: err.message,
        });
      }
    }
  );

  fastify.post(
    "/auth/signout",
    { preHandler: verifySession() },
    async (request, reply) => {
      try {
        await Session.revokeSession(request.session.getHandle());
        reply.send({ message: "User signed out successfully" });
      } catch (err) {
        console.error("Signout error:", err);
        reply.code(500).send({
          error: "Internal server error during signout",
          details: err.message,
        });
      }
    }
  );
};
