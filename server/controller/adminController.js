import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import adminModel from '../model/adminSchema.js';
import userModel from '../model/userSchema.js';
import recruiterModel from '../model/recruiterSchema.js';

const signInPost = async (req, res) => {
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

export default {
  signInPost, isAdminAuth, getUsersList, getRecruitersList,
};
