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
      type: String,
      required: true,

    },
    jobCategory: {
      type: String,
      required: true,
    },

    jobQualification: {
      type: String,
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
    image: {
      type: String,
    },
  },
  { timestamps: true },
);

export default model('jobPost', jobPosts);
