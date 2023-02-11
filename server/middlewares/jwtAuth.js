import jwt from 'jsonwebtoken';

const jwtSeeker = async (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    res.send({ status: 'failed', message: 'You need token' });
  } else {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        res.json({ auth: false, status: 'failed', message: 'failed to authenticate' });
      } else {
        req.userId = decoded.userId;
        next();
      }
    });
  }
};

export default { jwtSeeker };
