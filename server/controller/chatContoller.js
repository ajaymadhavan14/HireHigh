/* eslint-disable no-underscore-dangle */
import ChatModel from '../model/chatSchema.js';

const createChat = async (req, res, next) => {
  try {
    const findData = await ChatModel.findOne({
      members: { $in: [req.body.receiverId] },
    });
    if (findData) {
      res.json({ status: 'success', Id: findData._id });
    } else {
      const newChat = new ChatModel({
        members: [req.body.senderId, req.body.receiverId],
      });
      await newChat.save();
      res.status(200).json({ status: 'success', Id: newChat._id });
    }
  } catch (error) {
    res.status(500).json(error);
    next(error);
  }
};

const userChats = async (req, res, next) => {
  try {
    const chat = await ChatModel.find({
      members: { $in: [req.params.userId] },
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
      members: { $all: [req.params.firstId, req.params.secondId] },
    });
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
    next(error);
  }
};

export default { createChat, userChats, findChat };
