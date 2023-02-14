import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../model/userSchema.js';

const signupPost = async (req, res) => {
  const {
    firstName, lastName, email, password, phoneNumber,
  } = req.body;
  const user = await userModel.findOne({ email });
  if (user) {
    res.json({ status: 'failed', message: 'Email already exist login now' });
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
};

const signinPost = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (user) {
    const isMatch = await bcrypt.compare(password, user.password);
    if (user.email === email && isMatch) {
      const userId = user.id;
      const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
        expiresIn: 300,
      });

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
      message: 'No user please register',
    });
  }
};

const isUserAuth = async (req, res, next) => {
  try {
    const userDetails = await userModel.findById(req.userId);
    userDetails.auth = true;

    res.json({
      username: userDetails.firstName,
      email: userDetails.email,
      auth: true,
      image: userDetails.image || null,
    });
  } catch (error) {
    next(error);
  }
};

const userBlock = async (req, res, next) => {
  try {
    console.log(req.query.userId);
    await userModel.updateOne({ _id: req.query.userId }, {
      isActive: false,
    });
    res.json({ status: 'success' });
  } catch (error) {
    console.log(error);
  }
};

const userActive = async (req, res, next) => {
  try {
    await userModel.updateOne({ _id: req.query.userId }, {
      isActive: true,
    });
    res.json({ status: 'success' });
  } catch (error) {
    console.log(error);
  }
};
export default {
  signupPost, signinPost, isUserAuth, userBlock, userActive,
};
