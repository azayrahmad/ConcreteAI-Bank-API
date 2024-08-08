const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createAccount = async (userId, type) => {
  return prisma.account.create({
    data: {
      type,
      user: { connect: { id: userId } },
      balance: 0,
    },
  });
};

const findTransactionsByAccountId = async (accountId) => {
  return prisma.transaction.findMany({
    where: { accountId },
  });
};

module.exports = { createAccount, findTransactionsByAccountId };
