/* eslint-disable no-underscore-dangle */
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import companyModel from '../model/companySchema.js';
import jobPostModel from '../model/jobPostSchema.js';

const companySignUpPost = async (req, res, next) => {
  try {
    const {
      userName,
      phoneNumber,
      companyName,
      email,
      tagLine,
      discription,
      website,
      password,
      image,
    } = req.body;
    const company = await companyModel.findOne({ email });
    const number = await companyModel.findOne({ phoneNumber });
    if (company) {
      res.json({ status: 'failed', message: 'Email already exist login now' });
    } else if (number) {
      res.json({
        status: 'failed',
        message: 'Phone Number already exist login now',
      });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password.trim(), salt);
      await companyModel.create({
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
  } catch (error) {
    next(error);
  }
};

const companySignInPost = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const company = await companyModel.findOne({ email });
    if (company) {
      if (company.isActive === true) {
        const isMatch = await bcrypt.compare(password, company.password);
        if (company.email === email && isMatch) {
          const companyId = company.id;
          const token = jwt.sign({ companyId }, process.env.JWT_SECRET_KEY, {
            expiresIn: 60 * 60 * 24,
          });
          res.json({
            auth: true,
            token,
            result: company,
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
          message: 'Profile is Blocked',
        });
      }
    } else {
      res.json({
        auth: false,
        status: 'failed',
        message: 'No user please register',
      });
    }
  } catch (error) {
    next(error);
  }
};

const isCompanyAuth = async (req, res, next) => {
  try {
    const company = await companyModel.findById(req.companyId);
    if (company.isActive === true) {
      company.auth = true;
      res.json({
        id: company._id,
        username: company.userName,
        email: company.email,
        auth: true,
        phoneNumber: company.phoneNumber,
      });
    } else if (company.isActive === false) {
      res.json({ status: 'blocked' });
    } else {
      res.json({ status: 'failed' });
    }
  } catch (error) {
    next(error);
  }
};

const getProfile = async (req, res, next) => {
  try {
    const data = await companyModel.findById(req.companyId);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

const jobList = async (req, res, next) => {
  try {
    const data = await companyModel
      .findById(req.companyId)
      .populate('job.jobId');
    res.json(data);
  } catch (error) {
    next(error);
  }
};

const jobApproval = async (req, res, next) => {
  try {
    if (req.companyId && req.query.jobId) {
      await companyModel.findOneAndUpdate(
        { _id: req.companyId, 'job.jobId': req.query.jobId },
        { $set: { 'job.$.isActive': true } },
      );
      await jobPostModel.findByIdAndUpdate(req.query.jobId, {
        $set: { companyOk: true },
      });
      res.json({ status: 'success' });
    } else {
      res.json({ message: 'Not Approved' });
    }
  } catch (error) {
    next(error);
  }
};

const jobBlock = async (req, res, next) => {
  try {
    if (req.companyId && req.query.jobId) {
      await companyModel.findOneAndUpdate(
        { _id: req.companyId, 'job.jobId': req.query.jobId },
        { $set: { 'job.$.isActive': false } },
      );
      await jobPostModel.findByIdAndUpdate(req.query.jobId, {
        $set: { companyOk: false },
      });
      res.json({ status: 'success' });
    } else {
      res.json({ message: 'Not Approved' });
    }
  } catch (error) {
    next(error);
  }
};

export default {
  companySignUpPost,
  companySignInPost,
  isCompanyAuth,
  getProfile,
  jobList,
  jobApproval,
  jobBlock,
};
