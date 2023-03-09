import { Schema, model } from 'mongoose';

const companySignup = new Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
    },
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    phoneNumber: {
      required: true,
      type: Number,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
    },
    tagLine: {
      type: String,
      required: true,
    },
    discription: {
      type: String,
      required: true,
    },
    website: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    location: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true },
);

export default model('company', companySignup);
