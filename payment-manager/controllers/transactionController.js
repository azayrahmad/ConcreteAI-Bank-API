const transactionService = require("../services/transactionService");

const send = async (request, reply) => {
  const transaction = request.body;
  const processedTransaction = await transactionService.processTransaction(
    transaction
  );
  reply.send(processedTransaction);
};

const withdraw = async (request, reply) => {
  const transaction = request.body;
  const processedTransaction = await transactionService.processTransaction(
    transaction
  );
  reply.send(processedTransaction);
};

const getTransactions = async (request, reply) => {
  const { accountId } = request.params;
  const transactions = await transactionService.getTransactions(accountId);
  reply.send(transactions);
};

module.exports = { send, withdraw, getTransactions };
