import MessageModel from '../model/messageSchema.js';

const addMessage = async (req, res, next) => {
  const { chatId, senderId, text } = req.body;
  const message = new MessageModel({
    chatId, senderId, text,
  });
  try {
    const result = await message.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
    next(error);
  }
};

const getMessage = async (res, req, next) => {
  try {
    const result = await MessageModel.find({ chatId: req.query.chatId });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
    next(error);
  }
};
export default { addMessage, getMessage };
