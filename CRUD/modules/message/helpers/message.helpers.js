const Chat = require('../../../models/chatSchema');

const CID = (phoneNumber1, phoneNumber2) => (`${String(Math.min(Number(phoneNumber1), Number(phoneNumber2)))}-${Math.max(Number(phoneNumber1), Number(phoneNumber2))}`);

const getAllMessagesOfUserHelper = async ({ phoneNumber }) => {
  const findQuery = {
    cid: { $regex: `^(${phoneNumber}-|-${phoneNumber})` },
  };
  const chats = await Chat.find(findQuery).lean();
  const message = [];
  for (let i = 0; i < chats?.length; i += 1) {
    const phoneNumbers = chats[i].cid.split('-');
    if (phoneNumbers.includes(phoneNumber)) {
      message.push({ [chats[i].cid]: chats[i]?.messages });
    }
  }
  return { message };
};

const getAllMessagesOfTwoUsersHelper = async ({ phoneNumber1, phoneNumber2 }) => {
  const cid = CID(phoneNumber1, phoneNumber2);
  const chats = await Chat.findOne({ cid }).lean();
  return { message: chats?.messages };
};

const sendMessageHelper = async ({ sender, receiver, message }) => {
  const cid = CID(sender, receiver);
  let conversation = await Chat.findOne({ cid });
  if (!conversation) {
    conversation = new Chat({ cid, messages: [] });
    conversation.save();
  }
  await Chat.findOneAndUpdate({ cid }, { $push: { messages: `${sender}>${message}` } }); // upsert: true
};

module.exports = {
  getAllMessagesOfUserHelper,
  getAllMessagesOfTwoUsersHelper,
  sendMessageHelper,
};
