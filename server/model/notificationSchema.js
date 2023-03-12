import { Schema, model } from 'mongoose';

const notificationSchema = new Schema({
  senderId: {
    type: Schema.Types.ObjectId,
  },
  recieverId: {
    type: Schema.Types.ObjectId,
  },
  jobId: {
    type: Schema.Types.ObjectId,
    ref: 'jobPost',
  },
  content: {
    type: String,
  },
  type: {
    type: String,
    default: 'warning',
  },
  href: {
    type: String,
  },

}, {
  timestamps: true,
  capped: {
    size: 10024,
    max: 1000,
    autoIndexId: true,
  },
});

export default model('notification', notificationSchema);
