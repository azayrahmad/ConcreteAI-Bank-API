const userService = require("../services/userService");

const register = async (request, reply) => {
  const { username, password } = request.body;
  const user = await userService.registerUser(username, password);
  reply.send(user);
};

const getUser = async (request, reply) => {
  const { id } = request.params;
  const user = await userService.getUser(id);
  reply.send(user);
};

module.exports = { register, getUser };
