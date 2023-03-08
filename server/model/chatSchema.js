import { Schema, model } from 'mongoose';

const ChatSchema = new Schema({
  members: {
    type: Array,
  },

}, {
  timestamps: true,
});

export default model('chat', ChatSchema);
