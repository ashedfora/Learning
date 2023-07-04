const {
  statusCodes,
  errorResponse,
  successResponse,
} = require('../../../utils/constants');
const {
  registerUserHelper,
  deleteUserHelper,
  getAllUsersHelper,
  getUserByPhoneNumberHelper,
  changePasswordHelper,
} = require('../helpers/user.helpers');

const registerUser = async (req, res) => {
  try {
    const { phoneNumber, name, password } = req.body;
    await registerUserHelper({ phoneNumber, name, password });
    return successResponse({ res, message: 'User Registration Successful', code: statusCodes.STATUS_CODE_SUCCESS });
  } catch (error) {
    return errorResponse({ res, message: error.message, code: statusCodes.STATUS_CODE_FAILURE });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    await deleteUserHelper({ phoneNumber });
    return successResponse({ res, message: 'User Deleted', code: statusCodes.STATUS_CODE_SUCCESS });
  } catch (error) {
    return errorResponse({ res, message: error.message, code: statusCodes.STATUS_CODE_FAILURE });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await getAllUsersHelper();
    return successResponse({ res, message: allUsers, code: statusCodes.STATUS_CODE_SUCCESS });
  } catch (error) {
    return errorResponse({ res, message: error.message, code: statusCodes.STATUS_CODE_FAILURE });
  }
};

const getUserByPhoneNumber = async (req, res) => {
  try {
    const { phoneNumber } = req.params;
    const userData = await getUserByPhoneNumberHelper({ phoneNumber });
    return successResponse({ res, message: userData, code: statusCodes.STATUS_CODE_SUCCESS });
  } catch (error) {
    return errorResponse({ res, message: error.message, code: statusCodes.STATUS_CODE_FAILURE });
  }
};

const changePassword = async (req, res) => {
  try {
    const { phoneNumber, newPassword } = req.body;
    await changePasswordHelper({ phoneNumber, newPassword });
    return successResponse({ res, message: 'Password Changed', code: statusCodes.STATUS_CODE_SUCCESS });
  } catch (error) {
    return errorResponse({ res, message: error.message, code: statusCodes.STATUS_CODE_FAILURE });
  }
};

module.exports = {
  registerUser,
  deleteUser,
  getAllUsers,
  getUserByPhoneNumber,
  changePassword,
};
