const {
  getUserByPhoneNumber,
  getAllUsers,
  registerUser,
  deleteUser,
  changePassword,
} = require('../controllers/user.controllers');

const {
  validateRegisterUserParams,
  validateDeleteUserParams,
  validateChangePasswordParams,
} = require('../middleware/user.middleware');

const basePath = '/user';

module.exports = (router) => {
  router.put(`${basePath}/register`, validateRegisterUserParams, registerUser);
  router.delete(`${basePath}/`, validateDeleteUserParams, deleteUser);
  router.get(`${basePath}/list`, getAllUsers);
  router.get(`${basePath}/list/:phoneNumber`, getUserByPhoneNumber);
  router.patch(`${basePath}/change-password`, validateChangePasswordParams, changePassword);
};
