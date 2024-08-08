const accountService = require("../services/accountService");

const registerAccount = async (request, reply) => {
  const { userId, type } = request.body;
  const account = await accountService.registerAccount(userId, type);
  reply.send(account);
};

const getTransactions = async (request, reply) => {
  const { accountId } = request.params;
  const transactions = await accountService.getTransactions(accountId);
  reply.send(transactions);
};

module.exports = { registerAccount, getTransactions };
