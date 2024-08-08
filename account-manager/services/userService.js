const userModel = require("../models/userModel");

const registerUser = async (username, password) => {
  return userModel.createUser(username, password);
};

const getUser = async (id) => {
  return userModel.findUserById(id);
};

module.exports = { registerUser, getUser };
