import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import recruiterModel from '../model/recruiterSchema.js';
import jobPostModel from '../model/jobPostSchema.js';

const recruiterSignUpPost = async (req, res) => {
  console.log(req.body);
  const {
    userName, phoneNumber, companyName, email, tagLine, discription,
    website, password, image,
  } = req.body;
  const recruiter = await recruiterModel.findOne({ email });
  if (recruiter) {
    res.json({ status: 'failed', message: 'Email already exist login now' });
  } else {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password.trim(), salt);
    await recruiterModel.create({
      userName,
      companyName,
      phoneNumber,
      email,
      tagLine,
      discription,
      website,
      image,
      password: hashPassword,
    });
    res.json({ status: 'success', message: 'signup success' });
  }
};

const recruiterSignInPost = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  const recruiter = await recruiterModel.findOne({ email });
  if (recruiter) {
    const isMatch = await bcrypt.compare(password, recruiter.password);
    if (recruiter.email === email && isMatch) {
      const recruiterId = recruiter.id;
      const token = jwt.sign({ recruiterId }, process.env.JWT_SECRET_KEY, {
        expiresIn: 60 * 60 * 24,
      });
      res.json({
        auth: true,
        token,
        result: recruiter,
        status: 'success',
        message: 'signin success',
      });
    } else {
      res.json({
        auth: false,
        status: 'failed',
        message: 'User password is incorrect',
      });
    }
  } else {
    res.json({
      auth: false,
      status: 'failed',
      message: 'No user please register',
    });
  }
};

const isRecruiterAuth = async (req, res, next) => {
  try {
    const recruiterDetails = await recruiterModel.findById(req.recruiterId);
    recruiterDetails.auth = true;
    res.json({
      // eslint-disable-next-line no-underscore-dangle
      _id: recruiterDetails._id,
      username: recruiterDetails.userName,
      email: recruiterDetails.email,
      auth: true,
      image: recruiterDetails.image || null,
      phoneNumber: recruiterDetails.phoneNumber,
    });
  } catch (error) {
    next(error);
  }
};

const recruiterBlock = async (req, res) => {
  try {
    console.log(req.query.userId);
    await recruiterModel.updateOne({ _id: req.query.recruiterId }, {
      isActive: false,
    });
    res.json({ status: 'success' });
  } catch (error) {
    console.log(error);
  }
};

const recruiterActive = async (req, res) => {
  try {
    await recruiterModel.updateOne({ _id: req.query.recruiterId }, {
      isActive: true,
    });
    res.json({ status: 'success' });
  } catch (error) {
    console.log(error);
  }
};

const jobPost = async (req, res) => {
  const {
    jobTitle, companyName, jobCategory, jobQualification, jobDiscription,
    responsibilities, workPlace, salaryRange, jobType, image,
  } = req.body;
  const Id = req.query.id;
  await jobPostModel.create({
    jobTitle,
    jobCategory,
    jobDiscription,
    jobQualification,
    jobType,
    companyName,
    responsibilities,
    workPlace,
    salaryRange,
    image,
    recruiterId: Id,
  });
  res.json({ status: 'success' });
};



const getProfile = async (req, res) => {
  try {
    console.log(req.query.recruiterId);
  const data = await recruiterModel.findById(req.query.recruiterId);
  console.log(data);
  res.json({ data });
  } catch (error) {
    console.log(error.message)
  }
  
};

export default {
  recruiterSignUpPost,
  recruiterSignInPost,
  isRecruiterAuth,
  recruiterActive,
  recruiterBlock,
  jobPost,
  getProfile,
};
