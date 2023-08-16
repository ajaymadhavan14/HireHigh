import { Schema, model } from 'mongoose';

const jobPosts = new Schema(
  {
    recruiterId: {
      type: Schema.Types.ObjectId,
      ref: 'recruiter',
      required: true,
    },
    jobTitle: {
      type: String,
      required: true,
    },
    companyName: {
      type: Schema.Types.ObjectId,
      ref: 'company',
      required: true,
    },
    jobCategory: {
      type: Schema.Types.ObjectId,
      ref: 'jobCatogory',
      required: true,
    },

    jobQualification: {
      type: String,
      required: true,
    },
    vaccancy: {
      type: Number,
      required: true,
    },
    jobDiscription: {
      type: String,
      required: true,
    },
    workPlace: {
      type: String,
      required: true,
    },
    responsibilities: {
      type: String,
      required: true,
    },
    salaryRange: {
      type: String,
      required: true,
    },
    jobType: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    companyOk: {
      type: Boolean,
      default: false,
    },
    applied: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
    },
    location: {
      type: String,
      required: true,
    },
    users: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: 'users',
        },
        comment: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true },
);

export default model('jobPost', jobPosts);
