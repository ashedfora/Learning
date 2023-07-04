const basePath = '/message';
const {
  getAllMessagesOfUser,
  getAllMessagesOfTwoUsers,
  sendMessage,
} = require('../controllers/message.controllers');
const {
  validatePhoneNumberExistence, validateGetAllMessagesOfTwoUsers, validateSendMessageParams,
} = require('../middlewares/message.middleware');

module.exports = (router) => {
  router.post(`${basePath}/list`, validatePhoneNumberExistence, getAllMessagesOfUser);
  router.post(`${basePath}/list/:phoneNumber2`, validateGetAllMessagesOfTwoUsers, getAllMessagesOfTwoUsers);
  router.post(`${basePath}/send`, validateSendMessageParams, sendMessage);
};
