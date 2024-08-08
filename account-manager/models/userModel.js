const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createUser = async (username, password) => {
  return prisma.user.create({
    data: { username, password },
  });
};

const findUserById = async (id) => {
  return prisma.user.findUnique({ where: { id } });
};

module.exports = { createUser, findUserById };
