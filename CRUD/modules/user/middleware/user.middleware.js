const User = require('../../../models/userSchema');
const { errorResponse, statusCodes } = require('../../../utils/constants');
const hash = require('../../../utils/hasher');

const validateRegisterUserParams = async (req, res, next) => {
  try {
    const { phoneNumber } = req.body;
    if (Number.isNaN(Number(phoneNumber))) { // regex
      throw new Error('Invalid Phone Number'); // constants
    }
    const findQuery = {
      phoneNumber,
      deleted: { $ne: true },
    };
    const userData = await User.count(findQuery);
    if (userData) {
      throw new Error('User already exists'); // constants
    }
    return next();
  } catch (error) {
    return errorResponse({
      res,
      message: error.message,
      code: statusCodes.STATUS_CODE_FAILURE,
    });
  }
};
const validateDeleteUserParams = async (req, res, next) => {
  try {
    const { phoneNumber, password } = req.body;
    const findQuery = {
      phoneNumber,
      password: hash(password), // hash in db // improve name
    };
    const userData = await User.count(findQuery);
    if (!userData) {
      throw new Error('User doesn\'t exists');
    }
    return next();
  } catch (error) {
    return errorResponse({ res, message: error.message, code: statusCodes.STATUS_CODE_FAILURE });
  }
};
const validateChangePasswordParams = async (req, res, next) => {
  try {
    const { phoneNumber, password } = req.body;
    const findQuery = {
      phoneNumber,
      password: hash(password),
      deleted: false,
    };
    const userData = await User.count(findQuery);
    if (!userData) {
      throw new Error('Invalid Username or Password');
    }
    return next();
  } catch (error) {
    return errorResponse({ res, message: error.message, code: statusCodes.STATUS_CODE_FAILURE });
  }
};

module.exports = {
  validateRegisterUserParams,
  validateDeleteUserParams,
  validateChangePasswordParams,
};
