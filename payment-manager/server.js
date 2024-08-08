const fastify = require("fastify")({ logger: true });
const transactionRoutes = require("./routes/transactionRoutes");

fastify.register(require("@fastify/swagger"), {
  routePrefix: "/documentation",
  swagger: {
    info: {
      title: "Payment Manager API",
      description: "API for managing user transactions",
      version: "1.0.0",
    },
    host: "localhost:3001",
    schemes: ["http"],
    consumes: ["application/json"],
    produces: ["application/json"],
  },
  exposeRoute: true,
});

fastify.register(transactionRoutes);

const start = async () => {
  try {
    await fastify.listen(3001);
    fastify.swagger();
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
