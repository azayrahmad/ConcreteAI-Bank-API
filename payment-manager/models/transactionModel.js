const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createTransaction = async (transaction) => {
  return prisma.transaction.create({
    data: transaction,
  });
};

const getTransactions = async (accountId) => {
  return prisma.transaction.findMany({
    where: { accountId },
  });
};

module.exports = { createTransaction, getTransactions };
