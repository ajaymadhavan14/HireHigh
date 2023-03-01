import { Schema, model } from 'mongoose';

const userSignup = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
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
      required: true,
      type: Number,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    image: {
      type: String,
    },
    headline: {
      type: String,
    },
    position: {
      type: String,
    },
    location: {
      type: String,
    },
    qualifications: [
    ],
    discription: {
      type: String,
    },
    salaryRange: {
      type: String,
    },
    age: {
      type: String,
    },
    experiances: [
    ],
    resume: {
      type: String,
    },
    job: [
      {
        jobId: {
          type: Schema.Types.ObjectId,
          ref: 'jobPost',
        },
        applied: {
          type: Boolean,
        },
        comment: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true },
);

export default model('users', userSignup);
