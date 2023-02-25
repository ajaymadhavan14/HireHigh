/* eslint-disable no-underscore-dangle */
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../model/userSchema.js';
import jobModel from '../model/jobPostSchema.js';

const signupPost = async (req, res, next) => {
  try {
    const {
      firstName, lastName, email, password, phoneNumber,
    } = req.body;
    const user = await userModel.findOne({ email });
    const number = await userModel.findOne({ phoneNumber });
    if (user) {
      res.json({ status: 'failed', message: 'Email already exist login now' });
    } else if (number) {
      res.json({ status: 'failed', message: 'Phone Number already exist login now' });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password.trim(), salt);
      await userModel.create({
        firstName,
        lastName,
        email,
        password: hashPassword,
        phoneNumber,
      });
      res.json({ status: 'success', message: 'signup success' });
    }
  } catch (error) {
    next(error);
  }
};

const signinPost = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      if (user.isActive === true) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (user.email === email && isMatch) {
          const userId = user.id;
          const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
            expiresIn: 60 * 60 * 24,
          });
          console.log(token);
          res.json({
            auth: true,
            token,
            result: user,
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

const isUserAuth = async (req, res, next) => {
  try {
    const userDetails = await userModel.findById(req.userId);
    userDetails.auth = true;
    if (userDetails.isActive === true) {
      res.json({
        id: userDetails._id,
        username: userDetails.firstName,
        email: userDetails.email,
        auth: true,
        image: userDetails.image || null,
        job: userDetails.job,
      });
    } else if (userDetails.isActive === false) {
      res.json({ status: 'blocked' });
    } else {
      res.json({ status: 'failed' });
    }
  } catch (error) {
    next(error);
  }
};

const userBlock = async (req, res, next) => {
  try {
    await userModel.updateOne({ _id: req.query.userId }, {
      isActive: false,
    });
    res.json({ status: 'success' });
  } catch (error) {
    next(error);
  }
};

const userActive = async (req, res, next) => {
  try {
    await userModel.updateOne({ _id: req.query.userId }, {
      isActive: true,
    });
    res.json({ status: 'success' });
  } catch (error) {
    next(error);
  }
};

const JobListShow = async (req, res, next) => {
  try {
    const data = await jobModel.find({ isActive: true });
    res.json(data);
  } catch (error) {
    next(error);
  }
};

const jobApply = async (req, res, next) => {
  try {
    await userModel.findOneAndUpdate({ _id: req.body.id }, {
      $push: { job: { jobId: req.query.id, applied: true } },
    });
    await jobModel.findOneAndUpdate({ _id: req.query.id }, {
      $push: { users: { userId: req.body.id } },
    });
    res.json({ status: 'success' });
  } catch (error) {
    next(error);
  }
};

const getSingleView = async (req, res, next) => {
  try {
    const singleData = await jobModel.findById(req.query.id);
    const catId = singleData.jobCategory;
    const fullData = await jobModel.find({
      $and: [{ jobCategory: catId },
        { _id: { $ne: req.query.id } }],
    });
    res.json({ data: singleData, category: fullData });
  } catch (error) {
    next(error);
  }
};

const AddProfile = async (req, res, next) => {
  try {
    const {
      headline, position, location, qualification, discription, salaryRange, age, image, experiance,
    } = req.body;
    await userModel.findByIdAndUpdate(req.query.userId, {
      $set: {
        headline,
        position,
        image,
        experiance,
        location,
        qualification,
        discription,
        salaryRange,
        age,
      },
    });
    res.json({ status: 'success' });
  } catch (error) {
    next(error);
  }
};

const getProfileData = async (req, res, next) => {
  try {
    const data = await userModel.findById(req.query.userId);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

const searchProfilData = async (req, res, next) => {
  try {
    const data = await userModel.findById(req.query.userId);
    if (data.headline) {
      res.json({ status: 'success' });
    } else {
      res.json({ status: 'failed' });
    }
  } catch (error) {
    next(error);
  }
};

const userDataEditGet = async (req, res, next) => {
  try {
    const data = await userModel.findById(req.query.userId);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

const editUserProfilePost = async (req, res, next) => {
  try {
    const {
      experiance, age, salaryRange, discription, qualification, location, position, headline,
      image, phoneNumber, email, firstName, lastName,
    } = req.body;
    await userModel.findByIdAndUpdate(req.query.userId, {
      $set: {
        firstName,
        lastName,
        email,
        phoneNumber,
        experiance,
        age,
        salaryRange,
        discription,
        qualification,
        location,
        position,
        headline,
        image,
      },
    });
    res.json({ status: 'success' });
  } catch (error) {
    next(error);
  }
};
export default {
  signupPost,
  signinPost,
  isUserAuth,
  userBlock,
  userActive,
  JobListShow,
  jobApply,
  getSingleView,
  AddProfile,
  getProfileData,
  searchProfilData,
  userDataEditGet,
  editUserProfilePost,
};
