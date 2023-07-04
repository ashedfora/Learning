const User = require('../../../models/userSchema');
const hash = require('../../../utils/hasher');

const registerUserHelper = async ({ phoneNumber, name, password }) => {
  const findQuery = { phoneNumber, deleted: false };
  const updateQuery = {
    name,
    password: hash(password), // move to findQuery, create new object on each register
  };
  const options = {
    upsert: true,
  };
  await User.findOneAndUpdate(findQuery, updateQuery, options).lean();
};
const deleteUserHelper = async ({ phoneNumber }) => {
  const findQuery = { phoneNumber };
  await User.findOneAndUpdate(findQuery, { deleted: true }).lean(); // soft delete // updateQuery
};
const getAllUsersHelper = async () => {
  const projection = { _id: 0, name: 1, phoneNumber: 1 };
  const allUsers = await User.find({ deleted: false }, projection).lean(); // use projections
  return allUsers; // {} return type
};

const getUserByPhoneNumberHelper = async ({ phoneNumber }) => {
  const findQuery = { phoneNumber };
  const projection = { _id: 0, phoneNumber: 1, name: 1 };
  return User.find(findQuery, projection).lean(); // lean, projections
};

const changePasswordHelper = async ({ phoneNumber, newPassword }) => {
  const findQuery = {
    phoneNumber,
  };
  const updateQuery = {
    password: hash(newPassword),
  };
  const options = {
    upsert: true,
  };
  await User.findOneAndUpdate(findQuery, updateQuery, options).lean();
};
module.exports = {
  registerUserHelper,
  deleteUserHelper,
  getAllUsersHelper,
  getUserByPhoneNumberHelper,
  changePasswordHelper,
};
