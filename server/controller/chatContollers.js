import ChatModel from '../model/chatSchema.js';

const createChat = async (req, res, next) => {
  const newChat = new ChatModel({
    members: [{ senderId: req.body.senderId, receiverId: req.body.receiverId }],
  });
  try {
    const result = await newChat.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
    next(error);
  }
};

const userChats = async (req, res, next) => {
  try {
    const chat = await ChatModel.find({
      members: { $in: [req.query.userId] },
    });
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
    next(error);
  }
};

const findChat = async (req, res, next) => {
  try {
    const chat = await ChatModel.findOne({
      members: { $all: [req.query.firstId, req.query.secondId] },
    });
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
    next(error);
  }
};

export default { createChat, userChats, findChat };
