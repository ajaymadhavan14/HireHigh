import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import adminModel from '../model/adminSchema.js';
import userModel from '../model/userSchema.js';
import recruiterModel from '../model/recruiterSchema.js';
import jobPostModel from '../model/jobPostSchema.js';
import categoryModel from '../model/jobCategorySchema.js';

const signInPost = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const admin = await adminModel.findOne({ email });
    if (admin) {
      const isMatch = await bcrypt.compare(password, admin.password);
      if (admin.email === email && isMatch) {
        const adminId = admin.id;
        const token = jwt.sign({ adminId }, process.env.JWT_SECRET_KEY, {
          expiresIn: 60 * 60 * 24,
        });

        res.json({
          auth: true,
          token,
          result: admin,
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
  } catch (error) {
    next(error);
  }
};

const isAdminAuth = async (req, res, next) => {
  try {
    const adminDetails = await adminModel.findById(req.adminId);
    adminDetails.auth = true;

    res.json({
      username: adminDetails.name,
      email: adminDetails.email,
      auth: true,
    });
  } catch (error) {
    next(error);
  }
};

const getUsersList = async (req, res, next) => {
  try {
    const data = await userModel.find({});
    res.json(data);
  } catch (error) {
    next(error);
  }
};

const getRecruitersList = async (req, res, next) => {
  try {
    const data = await recruiterModel.find({});
    res.json(data);
  } catch (error) {
    next(error);
  }
};

const getAllJobs = async (req, res, next) => {
  try {
    const data = await jobPostModel.find().populate('jobCategory');
    res.json(data);
  } catch (error) {
    next(error);
  }
};

const jobPostBlock = async (req, res, next) => {
  try {
    await jobPostModel.updateOne({ _id: req.query.jobId }, {
      isActive: false,
    });
    res.json({ status: 'success' });
  } catch (error) {
    next(error);
  }
};

const jobPostActive = async (req, res, next) => {
  try {
    await jobPostModel.updateOne({ _id: req.query.jobId }, {
      isActive: true,
    });
    res.json({ status: 'success' });
  } catch (error) {
    next(error);
  }
};

const AddCategory = async (req, res, next) => {
  try {
    const { category } = req.body;
    await categoryModel.create({ name: category });
    res.json({ status: 'success' });
  } catch (error) {
    next(error);
  }
};

const ShowCategory = async (req, res, next) => {
  try {
    const data = await categoryModel.find({});
    res.json(data);
  } catch (error) {
    next(error);
  }
};

const DeleteCategory = async (req, res, next) => {
  try {
    await categoryModel.findByIdAndRemove(req.query.Id);
    res.json({ status: 'success' });
  } catch (error) {
    next(error);
  }
};

export default {
  signInPost,
  isAdminAuth,
  getUsersList,
  getRecruitersList,
  getAllJobs,
  jobPostActive,
  jobPostBlock,
  AddCategory,
  ShowCategory,
  DeleteCategory,
};
