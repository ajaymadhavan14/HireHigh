import { Schema, model } from "mongoose";

const recruiterSignup = new Schema(
  {
    companyName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      trim: true,
    },
    phoneNumber: {
      type: Number,
      trim: true,
    },
  },
  { timestamps: true }
);

export default model("recruiter", recruiterSignup);
