import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import adminModel from '../model/adminSchema.js';

const signInPost = async (req, res) => {
  console.log(req.body);

  const { email, password } = req.body;
  const admin = await adminModel.findOne({ email });
  if (admin) {
    const isMatch = await bcrypt.compare(password, admin.password);
    if (admin.email === email && isMatch) {
      const adminId = admin.id;
      const token = jwt.sign({ adminId }, process.env.JWT_SECRET_KEY, {
        expiresIn: 600,
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

export default { signInPost };
