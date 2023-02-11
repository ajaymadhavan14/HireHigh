import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import recruiterModel from '../model/recruiterSignupSchema.js';

const recruiterSignUpPost = async (req, res) => {
  console.log(req.body);
  const { companyName, email, password } = req.body;
  const user = await recruiterModel.findOne({ email });
  if (user) {
    console.log(user);
    res.json({ status: 'failed', message: 'Email already exist login now' });
  } else {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password.trim(), salt);
    await recruiterModel.create({
      companyName,
      email,
      password: hashPassword,
    });
    res.json({ status: 'success', message: 'signup success' });
  }
};

const recruiterSignInPost = async (req, res) => {
  console.log(req.body);

  const { email, password } = req.body;
  const user = await recruiterModel.findOne({ email });
  if (user) {
    const isMatch = await bcrypt.compare(password, user.password);
    if (user.email === email && isMatch) {
      const userId = user._id;
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

export default { recruiterSignUpPost, recruiterSignInPost };
