const fastify = require("fastify")({ logger: true });
const userRoutes = require("./routes/userRoutes");

fastify.register(require("fastify-swagger"), {
  routePrefix: "/documentation",
  swagger: {
    info: {
      title: "Account Manager API",
      description: "API for managing user accounts and transactions",
      version: "1.0.0",
    },
    host: "localhost:3000",
    schemes: ["http"],
    consumes: ["application/json"],
    produces: ["application/json"],
  },
  exposeRoute: true,
});

fastify.register(userRoutes);

const start = async () => {
  try {
    await fastify.listen(3000);
    fastify.swagger();
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
