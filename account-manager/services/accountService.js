const accountModel = require("../models/accountModel");

const registerAccount = async (userId, type) => {
  return accountModel.createAccount(userId, type);
};

const getTransactions = async (accountId) => {
  return accountModel.findTransactionsByAccountId(accountId);
};

module.exports = { registerAccount, getTransactions };
