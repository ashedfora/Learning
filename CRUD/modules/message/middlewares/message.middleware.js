const User = require('../../../models/userSchema');
const {
  errorResponse,
  statusCodes,
} = require('../../../utils/constants');
const hash = require('../../../utils/hasher');

const validatePhoneNumberExistence = async (req, res, next) => {
  try {
    const { phoneNumber } = req.body;
    const existenceOfUser = await User.exists({ phoneNumber }); // userExists
    if (!existenceOfUser) {
      throw new Error('Phone Number doesn\'t exists');
    }
    return next();
  } catch (error) {
    return errorResponse({ res, message: error.message, code: statusCodes.STATUS_CODE_FAILURE });
  }
};

const validateGetAllMessagesOfTwoUsers = async (req, res, next) => {
  try {
    const { phoneNumber: phoneNumber1, password } = req.body;
    const { phoneNumber2 } = req.params;
    const firstUserQuery = { phoneNumber: phoneNumber1, password: hash(password) };
    const existenceOfSender = await User.count(firstUserQuery);
    if (!existenceOfSender) {
      throw new Error('Authentication failed');
    }
    const secondUserQuery = { phoneNumber: phoneNumber2 };
    const existenceOfReceiver = await User.count(secondUserQuery);
    if (!existenceOfReceiver) {
      throw new Error('Invalid Input');
    }
    return next();
  } catch (error) {
    return errorResponse({ res, message: error.message, code: statusCodes.STATUS_CODE_FAILURE });
  }
};

const validateSendMessageParams = async (req, res, next) => {
  try {
    const { phoneNumber: sender, receiver, password } = req.body;
    const senderQuery = { phoneNumber: sender, password: hash(password) };
    const existenceOfSender = await User.count(senderQuery);
    if (!existenceOfSender) {
      throw new Error('Authentication failed for sender');
    }
    const receiverQuery = { phoneNumber: receiver };
    const existenceOfReceiver = await User.count(receiverQuery);
    if (!existenceOfReceiver) {
      throw new Error('Missing receiver\'s phone number');
    }
    return next();
  } catch (error) {
    return errorResponse({ res, message: error.message, code: statusCodes.STATUS_CODE_FAILURE });
  }
};

module.exports = {
  validatePhoneNumberExistence,
  validateSendMessageParams,
  validateGetAllMessagesOfTwoUsers,
};
