const {
  statusCodes,
  errorResponse,
  successResponse,
} = require('../../../utils/constants');

const {
  getAllMessagesOfUserHelper,
  getAllMessagesOfTwoUsersHelper,
  sendMessageHelper,
} = require('../helpers/message.helpers');

const getAllMessagesOfUser = async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    const { message } = await getAllMessagesOfUserHelper({ phoneNumber });
    return successResponse({ res, message, code: statusCodes.STATUS_CODE_SUCCESS });
  } catch (error) {
    return errorResponse({ res, message: error.message, code: statusCodes.STATUS_CODE_FAILURE });
  }
};

const getAllMessagesOfTwoUsers = async (req, res) => {
  try {
    const {
      phoneNumber: phoneNumber1,
    } = req.body;
    const { phoneNumber2 } = req.params;
    const { message } = await getAllMessagesOfTwoUsersHelper({
      phoneNumber1,
      phoneNumber2,
    });
    return successResponse({ res, message, code: statusCodes.STATUS_CODE_SUCCESS });
  } catch (error) {
    return errorResponse({ res, message: error.message, code: statusCodes.STATUS_CODE_FAILURE });
  }
};

const sendMessage = async (req, res) => {
  try {
    const { phoneNumber: sender, receiver, message } = req.body;
    await sendMessageHelper({ sender, receiver, message });
    return successResponse({ res, message: 'Message Delivered', code: statusCodes.STATUS_CODE_SUCCESS });
  } catch (error) {
    return errorResponse({ res, message: error.message, code: statusCodes.STATUS_CODE_FAILURE });
  }
};

module.exports = {
  getAllMessagesOfUser,
  getAllMessagesOfTwoUsers,
  sendMessage,
};
