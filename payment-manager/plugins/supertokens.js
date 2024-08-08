"use strict";

const cors = require("@fastify/cors");
const fp = require("fastify-plugin");
const formDataPlugin = require("@fastify/formbody");
const supertokens = require("supertokens-node");
const Session = require("supertokens-node/recipe/session");
const EmailPassword = require("supertokens-node/recipe/emailpassword");
const {
  plugin,
  errorHandler,
} = require("supertokens-node/framework/fastify/index.js");
const {
  verifySession,
} = require("supertokens-node/recipe/session/framework/fastify");
const Dashboard = require("supertokens-node/recipe/dashboard");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = fp(async function (fastify, opts) {
  supertokens.init({
    framework: "fastify",
    supertokens: {
      connectionURI: "https://try.supertokens.com/",
      //   apiKey: process.env.SUPERTOKENS_API_KEY,
    },
    appInfo: {
      appName: "Account Manager",
      apiDomain: "http://localhost:3000",
      websiteDomain: "http://localhost:3000",
      apiBasePath: "/auth",
      websiteBasePath: "/auth",
    },
    recipeList: [
      EmailPassword.init({
        override: {
          functions: (originalImplementation) => {
            return {
              ...originalImplementation,
              signUp: async function (input) {
                // First we call the original implementation of signUp.
                let response = await originalImplementation.signUp(input);

                // Post sign up response, we check if it was successful
                if (
                  response.status === "OK" &&
                  response.user.loginMethods.length === 1 &&
                  input.session === undefined
                ) {
                  /**
                   *
                   * response.user contains the following info:
                   * - emails
                   * - id
                   * - timeJoined
                   * - tenantIds
                   * - phone numbers
                   * - third party login info
                   * - all the login methods associated with this user.
                   * - information about if the user's email is verified or not.
                   *
                   */
                  // TODO: post sign up logic

                  const userId = response.user.id;
                  const userEmail = response.user.emails;
                  prisma.user.create({
                    data: { userEmail },
                  });
                }
                return response;
              },
            };
          },
        },
      }),
      Session.init(),
      Dashboard.init(),
    ],
  });

  await fastify.register(formDataPlugin);
  await fastify.register(plugin);
  fastify.setErrorHandler(errorHandler());

  fastify.decorate("supertokens", supertokens);
  fastify.decorate("verifySession", verifySession);
});
