import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import recruiterModel from '../model/recruiterSchema.js';

const recruiterSignUpPost = async (req, res) => {
  console.log(req.body);
  const {
    userName, phoneNumber, companyName, email, tagLine, discription,
    website, password,
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
        expiresIn: 300,
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

const recruiterBlock = async (req, res, next) => {
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

const recruiterActive = async (req, res, next) => {
  try {
    await recruiterModel.updateOne({ _id: req.query.recruiterId }, {
      isActive: true,
    });
    res.json({ status: 'success' });
  } catch (error) {
    console.log(error);
  }
};

export default {
  recruiterSignUpPost, recruiterSignInPost, isRecruiterAuth, recruiterActive, recruiterBlock,
};
