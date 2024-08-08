const transactionModel = require("../models/transactionModel");

const processTransaction = async (transaction) => {
  return new Promise((resolve, reject) => {
    console.log("Transaction processing started for:", transaction);

    setTimeout(async () => {
      try {
        const processedTransaction = await transactionModel.createTransaction(
          transaction
        );
        console.log("transaction processed for:", processedTransaction);
        resolve(processedTransaction);
      } catch (error) {
        reject(error);
      }
    }, 30000); // 30 seconds
  });
};

const getTransactions = async (accountId) => {
  return transactionModel.getTransactions(accountId);
};

module.exports = { processTransaction, getTransactions };
