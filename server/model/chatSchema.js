import { Schema, model } from 'mongoose';

const ChatSchema = new Schema({
  members: [{
    senderId: {
      type: String,
    },
    receiverId: {
      type: String,
    },
  }],

}, {
  timestamps: true,
});

export default model('chat', ChatSchema);
